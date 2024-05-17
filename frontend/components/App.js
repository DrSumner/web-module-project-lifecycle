import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

let id = 0
let getId= () => id++

const initialTodos = [
  {name:'a',id:4,completed: false},
  {name:'b',id:98,completed: true},
  {name:'c',id:97,completed: false}]
const initialValues = {name: ''}
export default class App extends React.Component {

   state = {
    todos: initialTodos,
    values: initialValues
   }

   onSubmit = evt =>{
    evt.preventDefault()
    getId()

    this.setState({
      ...this.state,
      todos: this.state.todos.concat(this.state.values),
      values: initialValues
    }); console.log(this.state.todos)

    
   }

   onChange = evt =>{
    
    this.setState({
      ...this.state,
      values: {id:id, name:evt.target.value,  completed:false}
    })
   }

    completeMark = evt => {

      const {id} = evt.target
      
      this.setState({
        ...this.state,
        todos: this.state.todos.map(todo => {
          if(todo.id == id){
            return {...todo, completed: !todo.completed}
          } return todo
        })
      })
    }

    componentDidMount() {
      axios.get(URL)
      .then(res =>
      this.setState({
        ...this.state,
        todos : res.data.data
      }))
        .catch(err => console.log(err.message))

    }

  render() {

   

    return (
      <div>
        <TodoList completeMark={this.completeMark} todos={this.state.todos}/>
        <Form onSubmit={this.onSubmit} name={this.state.values.name} onChange={this.onChange}/>
      </div>
    )
  }
}
