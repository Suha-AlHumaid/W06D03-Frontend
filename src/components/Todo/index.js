import React from 'react'

function Todo(props) {

    return (
        <div>
          <h1>{props.elem.name}<span onClick={()=>props.deleteTodo(props.elem)}>X</span></h1> 
        </div>
    )
}
export default Todo