import React, { useState, useRef, useEffect } from 'react'
import api from '~/services/api'
import { Container } from './styles'
import { useField } from '@rocketseat/unform'

export default function Avatar() {
  const { defaultValue, registerField } = useField('avatar')
  const [preview, setPreview] = useState(defaultValue && defaultValue.url)
  const [file, setFile] = useState(defaultValue && defaultValue.id)
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file'
      })
    }
  }, [defaultValue, ref, registerField])

  async function handleChange(e) {
    const data = new FormData()
    data.append('file', e.target.files[0])
    const response = await api.post('files', data)
    const { id, url } = response.data
    setFile(id)
    setPreview(url)
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview ||
            'https://api.adorable.io/avatars/47/abott@adorable.paddingHorizontal'
          }
          alt="avatar"
        />
        <input
          type="file"
          id="avatar"
          data-file={file}
          accept="image/*"
          ref={ref}
          onChange={handleChange}
        />
      </label>
    </Container>
  )
}
