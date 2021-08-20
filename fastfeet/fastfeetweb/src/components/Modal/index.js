import React from 'react'
import { Container } from './styles'
import Modal from 'react-responsive-modal'

export default function OptionsModal({ open, handleClose, data }) {
  const { recipient, start_date, end_date } = data

  return (
    <Container>
      <Modal open={open} onClose={handleClose}>
        <h4>Delivery Information</h4>
        <div>
          <ul>
            <li>{recipient?.street}</li>
            <li>{recipient?.city}</li>
            <li>{recipient?.state}</li>
          </ul>
        </div>
        <div>
          <h4>Dates</h4>
          <p>
            <strong>Retrieved: </strong>{' '}
            <span>{start_date ? start_date : 'awaiting pick up'}</span>
            <br />
            <strong>Delivered: </strong>{' '}
            <span>{end_date ? end_date : 'awaiting drop off'}</span>
          </p>
        </div>
        <div>
          <h4>Recipient Signature</h4>
        </div>
      </Modal>
    </Container>
  )
}
