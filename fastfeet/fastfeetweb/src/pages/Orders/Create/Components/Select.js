import React, { useState, useEffect, useMemo, useRef } from 'react'
import SelectAsync from 'react-select/async'
import api from '~/services/api'
import { useField } from '@unform/core'

export default function Select({ path, name, label, ...rest }) {
  const [inputValue, setInputValue] = useState('')
  const [initialOptions, setOptions] = useState([])
  const { fieldName, defaultValue = '', registerField } = useField(name)
  const selectRef = useRef(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return []
          }
          return ref.select.state.value.map((option) => option.value)
        } else {
          if (!ref.select.state.value) {
            return ''
          }
          return ref.select.state.value.value
        }
      },
    })
  }, [fieldName, registerField, rest.isMulti])

  useEffect(() => {
    async function loadInitalItems() {
      const response = await api.get(`${path}=${inputValue}`)
      setOptions(response.data)
    }
    loadInitalItems()
  }, [inputValue, path])

  const filteredOptions = useMemo(
    () => initialOptions.map((i) => ({ label: i.name, value: i.id })),
    [initialOptions]
  )

  function filterOptions(data) {
    return data.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  function loadOptions(inputValue, cb) {
    cb(filterOptions(filteredOptions))
  }

  function handleChange(newValue) {
    const inputValue = newValue.replace(/\W/g, '')
    setInputValue(inputValue)
    return inputValue
  }

  return (
    <>
      <SelectAsync
        placeholder={label}
        cacheOptions
        ref={selectRef}
        defaultValue={defaultValue}
        defaultInputValue={inputValue}
        defaultOptions={filteredOptions}
        onInputChange={handleChange}
        loadOptions={loadOptions}
      />
    </>
  )
}
