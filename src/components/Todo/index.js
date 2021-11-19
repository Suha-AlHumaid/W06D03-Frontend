import React from "react";
import "./style.css"
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineEdit } from "react-icons/ai";

function Todo(props) {

  const [isEditing, setEditing] = useState(false);

  return isEditing ? (
    <div>
      <form
        onSubmit={(e) => {
    
          props.editTodo(e, props.elem);
        }}
      >
        <input type="text"
         name="newTask"
         placeholder="Edit your task"
        className="form-input"/>
        <button>Done</button>
      </form>
    </div>
  ) : (
    <div className="todo">
      <h2>{props.elem.name} </h2>
      <div className="icons">
      <TiDeleteOutline 
      onClick={() => props.deleteTodo(props.elem)}
      className="icon"
       />
      <AiOutlineEdit
        onClick={() => {
          setEditing(true);
        }}
        className="icon"
      />
      </div>
    </div>
  );
}

export default Todo;
