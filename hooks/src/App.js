import React, { useEffect, useState, useCallback, useMemo } from 'react'
import './App.css'

function App() {
  const [techs, setTechs] = useState(['react native'])
  const [newTech, setNewTech] = useState('')

  const handleAdd = useCallback(() => {
    setTechs([...techs, newTech])
    setNewTech('')
  }, [newTech, techs])

  useEffect(() => {
    const storageTechs = localStorage.getItem('techs')
    if (storageTechs) {
      setTechs(JSON.parse(storageTechs))
    }
  }, [])

// gag
// dsfagr

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs))
  }, [techs])

  const techLength = useMemo(() => techs.length, [techs])

  return (
    <div>
      <>
        <ul>
          {techs.map(tech => (
            <li>{tech}</li>
          ))}
        </ul>
        <p> you have {techLength} tech(s) on the list</p>
        <input
          type="text"
          value={newTech}
          onChange={e => setNewTech(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          add
        </button>
      </>
    </div>
  )
}

export default App
