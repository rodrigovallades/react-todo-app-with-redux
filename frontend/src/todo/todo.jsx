import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/page-header'
import TodoForm from './todo-form'
import TodoList from './todo-list'

const API_URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {

  constructor(props) {
    super(props)
    this.state = { description: '', list: [] }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
    this.handleMaskAsPending = this.handleMaskAsPending.bind(this)

    this.refresh()
  }

  refresh() {
    axios.get(`${API_URL}?sort=-createdAt`)
      .then(res => this.setState({ description: '', list: res.data }))
  }

  handleAdd() {
    console.log(this)
    const description = this.state.description

    axios.post(API_URL, { description })
      .then(res => this.refresh())
  }

  handleRemove(todo) {
    axios.delete(`${API_URL}/${todo._id}`)
      .then(res => this.refresh())
  }

  handleMarkAsDone(todo) {
    axios.put(`${API_URL}/${todo._id}`, { done: true })
      .then(res => this.refresh())
  }

  handleMaskAsPending(todo) {
    axios.put(`${API_URL}/${todo._id}`, { done: false })
      .then(res => this.refresh())
  }

  handleChange(event) {
    this.setState({ description: event.target.value })
  }

  render() {
    return (
      <div>
        <PageHeader name='Tasks' subname='Register'></PageHeader>
        <TodoForm
          description={this.state.description}
          handleAdd={this.handleAdd}
          handleChange={this.handleChange} />
        <TodoList
          list={this.state.list}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMaskAsPending={this.handleMaskAsPending}
          handleRemove={this.handleRemove} />
      </div>
    )
  }
}
