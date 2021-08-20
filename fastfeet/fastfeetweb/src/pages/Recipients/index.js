import React, { useState, useEffect } from 'react'
import api from '~/services/api'
import history from '~/services/history'
import { Container, Table, Controls, Modal } from './styles'
import { MdMoreHoriz, MdAdd, MdEdit, MdDelete } from 'react-icons/md'

export default function Recipients() {
  const [recipients, setRecipients] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get(`recipients?name=${query}`)
      const formatted = response.data.map((r) => ({
        id: r.id,
        name: r.name,
        modal: false,
        address: `${r.street} ${r.city}, ${r.state}, ${r.zip}`,
      }))

      setRecipients(formatted)
    }
    loadRecipients()
  }, [query])

  function handleNavigation(path, data = {}) {
    history.push(`/recipient/${path}`, data)
  }

  async function handleDelete(recipient) {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(
      `Are you sure you want to delete ${recipient.name}`
    )
    if (confirmation) {
      await api.delete(`/recipient/${recipient.id}`)
      setRecipients(recipients.filter((r) => r.id !== recipient.id))
    }
  }

  function handleModal(id) {
    setRecipients(
      recipients.map((order) =>
        order.id === id ? { ...order, modal: !order.modal } : order
      )
    )
  }

  return (
    <Container>
      <Controls>
        <div>
          <h2>Recipient management</h2>
          <input
            type="text"
            placeholder="Search orders"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <button onClick={() => handleNavigation('new')}>
          <MdAdd color="#FFF" size={16} />
          Add
        </button>
      </Controls>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((recipient) => (
            <tr key={recipient.id}>
              <td>
                <div>#{recipient.id}</div>
              </td>
              <td>
                <div>
                  <span>{recipient.name}</span>
                </div>
              </td>
              <td>
                <div>
                  <span>{recipient.address}</span>
                </div>
              </td>
              <td>
                <div>
                  <button onClick={() => handleModal(recipient.id)}>
                    <MdMoreHoriz />
                  </button>
                  <Modal modal={recipient.modal}>
                    <ul>
                      <li>
                        <button
                          onClick={() =>
                            handleNavigation(recipient.id, { recipient })
                          }
                        >
                          <MdEdit color="#4D85EE" />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleDelete(recipient)}>
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
