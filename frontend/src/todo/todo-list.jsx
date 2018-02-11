import React from 'react'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/icon-button'
import { markAsDone, markAsPending, remove } from './todo-actions'


const TodoList = props => {

  const renderRows = () => {
    const list = props.list || []
    return list.map(todo => (
      <tr key={todo._id} className='tasks__task'>
        <td className={todo.done ? 'tasks__task--done' : ''}>{todo.description}</td>
        <td className='tasks__task--actions'>
          <div className='btn-group'>
            <IconButton
              style='danger'
              icon='times'
              hide={!todo.done}
              onClick={() => props.remove(todo)}></IconButton>
            <IconButton
              style='success'
              icon='check'
              hide={todo.done}
              onClick={() => props.markAsDone(todo)}></IconButton>
            <IconButton
              style='warning'
              icon='undo'
              hide={!todo.done}
              onClick={() => props.markAsPending(todo)}></IconButton>
          </div>
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

const mapStateToProps = state => ({ list: state.todo.list })
const mapDispatchToProps = dispatch => bindActionCreators({ markAsDone, markAsPending, remove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
