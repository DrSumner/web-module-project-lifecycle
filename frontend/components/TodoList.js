import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {

  state = {
    hide: false
  }

  onClick = () => {
    this.setState({
      ...this.state,
      hide: !this.state.hide
    })
  }

  render() {

    const {todos, completeMark} = this.props
    const filtered = todos.filter( todo => !todo.completed)
    return (
      <div>
        {this.state.hide ? 
        filtered.map( todo => <Todo completeMark={completeMark} key={todo.id} todo={todo}/> ) 
        :todos.map( todo => <Todo completeMark={completeMark} key={todo.id} todo={todo}/> )}
        <button onClick={this.onClick}>Hide completed</button>
      </div>
    )
  }
}
