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
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClear = this.handleClear.bind(this)

    this.refresh()
  }

  refresh(description = '') {
    const search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${API_URL}?sort=-createdAt${search}`)
      .then(res => this.setState({ description, list: res.data }))
  }

  handleAdd() {
    console.log(this)
    const description = this.state.description

    axios.post(API_URL, { description })
      .then(res => this.refresh())
  }

  handleSearch() {
    this.refresh(this.state.description)
  }

  handleClear() {
    this.refresh()
  }

  handleRemove(todo) {
    axios.delete(`${API_URL}/${todo._id}`)
      .then(res => this.refresh(this.state.description))
  }

  handleMarkAsDone(todo) {
    axios.put(`${API_URL}/${todo._id}`, { done: true })
      .then(res => this.refresh(this.state.description))
  }

  handleMaskAsPending(todo) {
    axios.put(`${API_URL}/${todo._id}`, { done: false })
      .then(res => this.refresh(this.state.description))
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
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear} />
        <TodoList
          handleMarkAsDone={this.handleMarkAsDone}
          handleMaskAsPending={this.handleMaskAsPending}
          handleRemove={this.handleRemove} />
      </div>
    )
  }
}
