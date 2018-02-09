import React, { Component } from 'react'
import PageHeader from '../template/page-header'
import TodoForm from './todo-form'
import TodoList from './todo-list'

export default class Todo extends Component {

  constructor(props) {
    super(props)
    this.state = { description: '', list: [] }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleAdd() {
    console.log(this)
  }

  handleChange(event) {
    this.setState({ description: event.target.value })
  }

  render() {
    return (
      <div>
        <PageHeader name='Tasks' subname='Register'></PageHeader>
        <TodoForm handleAdd={this.handleAdd} handleChange={this.handleChange} description={this.state.description} />
        <TodoList/>
      </div>
    )
  }
}
