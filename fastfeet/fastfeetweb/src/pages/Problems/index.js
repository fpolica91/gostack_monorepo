import React, { useState, useEffect } from 'react'
import api from '~/services/api'
import { Container, Table, Modal } from './styles'
import { MdMoreHoriz, MdDelete, MdRemoveRedEye } from 'react-icons/md'

export default function Problems() {
  const [problems, setProblems] = useState([])

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`problems`)
      const problems = response.data.map((p) => ({
        ...p,
        modal: false,
      }))
      setProblems(problems)
    }
    loadProblems()
  }, [])

  function handleModal(id) {
    setProblems(
      problems.map((p) => (p.id === id ? { ...p, modal: !p.modal } : p))
    )
  }

  async function handleDelete(id) {
    await api.delete(`/problemOrder/${id}`)
    setProblems(problems.filter((p) => p.id !== id))
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Problem</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>
                <div>#{problem.order_id}</div>
              </td>
              <td>
                <div>
                  <span>{problem.description}</span>
                </div>
              </td>
              <td>
                <div>
                  <button onClick={() => handleModal(problem.id)}>
                    <MdMoreHoriz />
                  </button>
                  <Modal modal={problem.modal}>
                    <ul>
                      <li>
                        <button>
                          <MdRemoveRedEye color="#8E5BE8" />
                          See
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleDelete(problem.id)}>
                          <MdDelete color="#DE3B3B" />
                          Delete
                        </button>
                      </li>
                    </ul>
                  </Modal>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
