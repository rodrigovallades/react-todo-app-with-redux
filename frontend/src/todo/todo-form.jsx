import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/icon-button'
import { changeDescription, search, add } from './todo-actions'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.keyHandler = this.keyHandler.bind(this)
  }

  componentWillMount() {
    this.props.search()
  }

  keyHandler(e) {
    const { add, search, description } = this.props
    if (e.key === `Enter`) {
      e.shiftKey ? search() : add(description)
    } else if (e.key === 'Escape') {
      this.props.handleClear()
    }
  }

  render() {
    const { add, search, description } = this.props
    return (
      <div role='form' className='todo-form'>
        <Grid breakpoints='12 9 10'>
          <input
            id='description'
            className='form-control'
            placeholder='Add a task'
            onChange={this.props.changeDescription}
            onKeyUp={this.keyHandler}
            value={this.props.description} />
        </Grid>
        <Grid breakpoints='12 3 2'>
          <IconButton
            style='primary'
            icon='plus'
            onClick={() => add(description)} />
          <IconButton
            style='info'
            icon='search'
            onClick={() => search()} />
          <IconButton
            style='default'
            icon='close'
            onClick={this.props.handleClear} />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({ description: state.todo.description })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeDescription, search, add }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
