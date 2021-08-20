/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import api from '~/services/api'
import history from '~/services/history'
import { Container, Table, Span, Courier, Controls, Modal } from './styles'
import OptionsModal from '~/components/Modal/index'
import {
  MdMoreHoriz,
  MdAdd,
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
} from 'react-icons/md'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [modalDisplay, setModalDisplay] = useState(false)
  const [query, setQuery] = useState('')
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get(`/orders?product=${query}`)
      const orders = response.data.map((order) => ({
        ...order,
        modal: false,
        status:
          order.end_date && !order.cancelled_at
            ? 'delivered'
            : !order.start_date && !order.cancelled_at
            ? 'pending'
            : order.start_date && !order.cancelled_at
            ? 'retrieved'
            : 'cancelled',
        courierInitials: order.courier.name
          .split(' ')
          .map((name) => name[0])
          .join(''),
      }))

      setOrders(orders)
    }
    fetchOrders()
  }, [query])

  function handleNavigation() {
    history.push('/order/new')
  }

  function handleModal(id) {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, modal: !order.modal } : order
      )
    )
  }

  function handleClose() {
    setModalDisplay(false)
  }

  function handleModalInformatio(order) {
    setModalDisplay(true)
    setModalData(order)
  }

  async function handleOrderDelete(id) {
    const confirmation = confirm('Are you sure you  want to delete this order?')
    if (confirmation) {
      await api.delete(`/orders/${id}`)
      setOrders(orders.filter((order) => order.id !== id))
    }
  }

  return (
    <Container>
      <OptionsModal
        open={modalDisplay}
        handleClose={handleClose}
        data={modalData}
      />
      <Controls>
        <div>
          <h2>Order management</h2>
          <input
            type="text"
            placeholder="Search orders"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <button onClick={handleNavigation}>
          <MdAdd color="#FFF" size={16} />
          Add
        </button>
      </Controls>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipient</th>
            <th>Courier</th>
            <th>City</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <span>#{order.id}</span>
              </td>
              <td>
                <span>{order.recipient.name}</span>
              </td>
              <td>
                <Courier>
                  <span>{order.courierInitials}</span>
                  {order.courier.name}
                </Courier>
              </td>
              <td>
                <span>{order.recipient.city}</span>
              </td>
              <td>
                <span>{order.recipient.state}</span>
              </td>
              <td>
                <Span statusColor={order.status}>
                  <span>{order.status}</span>
                </Span>
              </td>
              <td>
                <button type="button" onClick={() => handleModal(order.id)}>
                  <MdMoreHoriz size={16} />
                </button>
                <Modal modal={order.modal}>
                  <ul>
                    <li>
                      <button onClick={() => handleModalInformatio(order)}>
                        <MdRemoveRedEye color="#8E5BE8" />
                        See
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() =>
                          history.push(`/order/edit/${order.id}`, {
                            order,
                          })
                        }
                      >
                        <MdEdit color="#4D85EE" />
                        Edit
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleOrderDelete(order.id)}>
                        <MdDelete color="#DE3B3B" />
                        Delete
                      </button>
                    </li>
                  </ul>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
