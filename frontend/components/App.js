import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'


let getId= () => Date.now().toString(36)



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
    //getId()

    // this.setState({
    //   ...this.state,
    //   todos: this.state.todos.concat(this.state.values),
    //   values: initialValues
    // }); console.log(this.state.todos)

    axios.post('http://localhost:9000/api/todos', this.state.values)
    .then(res => {
      console.log(res.data)
      this.setState({
        ...this.state,
        todos: this.state.todos.concat(res.data.data),
        values: initialValues
      })
    })

   }

   onChange = evt =>{
    
    this.setState({
      ...this.state,
      values: {id:getId(), name:evt.target.value,  completed:false}
    })
   }

    completeMark = evt => {
      let payload
      const {id} = evt.target
      this.state.todos.map(todo => {
        if(todo.id == id){
          payload = todo
        }
      })
      payload.completed = !payload.completed 
      console.log(payload)
      
      // this.setState({
      //   ...this.state,
      //   todos: this.state.todos.map(todo => {
      //     if(todo.id == id){
      //       return {...todo, completed: !todo.completed}
      //     } return todo
      //   })
      // })

      axios.patch(`http://localhost:9000/api/todos/${id}`, payload )
      .then(res => {
        console.log(res)
        this.setState({
          ...this.state,
          todos: this.state.todos.map( todo =>{
            if(todo.id == payload.id){
              return payload
            }
            return todo}
          )
        })
      })
      .catch(err => console.log(err.message))
    }

    componentDidMount() {
      axios.get(URL)
      .then(res =>{
        console.log(res.data.data)
      this.setState({
        ...this.state,
        todos : res.data.data
      })})
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
