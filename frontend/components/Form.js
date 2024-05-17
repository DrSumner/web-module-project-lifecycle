import React from 'react'

export default class Form extends React.Component {

  

  render() {
    const {onSubmit, onChange, name} = this.props

    return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange}
       value={name} 
       type='text' 
       placeholder='Add Todo'>

       </input>
       <input type='submit'></input>
    </form>)
  }
}
