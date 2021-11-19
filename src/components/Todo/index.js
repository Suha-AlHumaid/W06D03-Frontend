import React from "react";
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
        <input type="text" name="newTask" />
        <button>Done</button>
      </form>
    </div>
  ) : (
    <div>
      <h2>{props.elem.name} </h2>
      <TiDeleteOutline onClick={() => props.deleteTodo(props.elem)} />
      <AiOutlineEdit
        onClick={() => {
          setEditing(true);
        }}
      />
    </div>
  );
}

export default Todo;
