import React from 'react'

export default class Todo extends React.Component {
  render() {

    const {completeMark} = this.props
    const {name, id, completed, } = this.props.todo
    return (
      <div id={id} style={{cursor: 'pointer'}} onClick={completeMark}>
        {name}{completed && '✓'}
      </div>
    )
  }
}
