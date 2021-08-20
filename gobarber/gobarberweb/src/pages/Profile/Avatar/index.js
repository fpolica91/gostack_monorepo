import React, { useState, useRef, useEffect } from 'react'
import { useField } from '@rocketseat/unform'
import api from '~/services/api'
import { Container } from './styles'

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
  }, [ref, registerField])

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
        <img src={preview} alt="profile_avatar" />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          ref={ref}
          onChange={handleChange}
        />
      </label>
    </Container>
  )
}
