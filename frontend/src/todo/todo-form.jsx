import React from 'react'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/icon-button'
import { changeDescription } from './todoActions'

const TodoForm = props => {
  const keyHandler = (e) => {
    if (e.key === `Enter`) {
      e.shiftKey ? props.handleSearch() : props.handleAdd()
    } else if (e.key === 'Escape') {
      props.handleClear()
    }
  }

  return (
    <div role='form' className='todo-form'>
      <Grid breakpoints='12 9 10'>
        <input
          id='description'
          className='form-control'
          placeholder='Add a task'
          onChange={props.changeDescription}
          onKeyUp={keyHandler}
          value={props.description} />
      </Grid>
      <Grid breakpoints='12 3 2'>
        <IconButton
          style='primary'
          icon='plus'
          onClick={props.handleAdd} />
        <IconButton
          style='info'
          icon='search'
          onClick={props.handleSearch} />
        <IconButton
          style='default'
          icon='close'
          onClick={props.handleClear} />
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({ description: state.todo.description })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeDescription }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
