import React from 'react'
import IconButton from '../template/icon-button'


export default props => {

  const renderRows = () => {
    const list = props.list || []
    return list.map(todo => (
      <tr key={todo._id} className='tasks__task'>
        <td className={todo.done ? 'tasks__task--done' : ''}>{todo.description}</td>
        <td className='tasks__task--actions'>
          <IconButton
            style='success'
            icon='check'
            hide={todo.done}
            onClick={() => props.handleMarkAsDone(todo)}></IconButton>
          <IconButton
            style='warning'
            icon='undo'
            hide={!todo.done}
            onClick={() => props.handleMaskAsPending(todo)}></IconButton>
          <IconButton
            style='danger'
            icon='trash-o'
            hide={!todo.done}
            onClick={() => props.handleRemove(todo)}></IconButton>
        </td>
      </tr>
    ))
  }

  return (
    <table className='table tasks'>
      <thead>
        <tr>
          <th>Description</th>
          <th className='tasks__task--actions'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
  )
}
