import React, { useReducer } from 'react'

type Action =
  | { type: 'add'; text: string }
  | {
      type: 'remove'
      idx: number
    }

/**
 * @State list of todos
 * @State  = @Todos[]
 */

interface Todo {
  text: string
  complete: boolean
}

type State = Todo[]

const TodoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add':
      return [...state, { text: action.text, complete: false }]
    case 'remove':
      return state.filter((_, i) => action.idx !== i)
    default:
      return state
  }
}

export const ReducerExample: React.FC = () => {
  const [todos, dispatch] = useReducer(TodoReducer, [])
  return (
    <div>
      {JSON.stringify(todos)}
      <button
        onClick={() => {
          dispatch({ type: 'add', text: '...' })
        }}
      >
        +
      </button>
    </div>
  )
}
