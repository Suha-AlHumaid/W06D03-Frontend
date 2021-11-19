import React from "react";
import "./style.css"
import axios from "axios";
import Todo from "../Todo";
import { useState, useEffect } from "react";
const Todos = () => {
  let [toDos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/todos`);
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //add to list
  const handleClick = (e) => {
    e.preventDefault();
        //check if text field is empty or not
    if (e.target.task.value) {
      const response = axios.post("http://localhost:5000/todo", {
        name: e.target.task.value,
      });
      setTodos(response.data);
      const todo = { id: toDos.length + 1, name: e.target.task.value }; //create new object
      setTodos([...toDos, todo]); // add object to todos array
      e.target.task.value = ""; //to make value text empty in text feild "task"
    }
  };

  //delete todo
  const deleteTodo = (elem) => {
    const response = axios.put(`http://localhost:5000/delTodo/${elem.id}`);
    setTodos(response.data);
    setTodos(toDos.filter((todo) => todo.id !== elem.id));
  };

  // edit todo
  const editTodo = (e, elem, newTask) => {
    // e.preventDefault();
    const task = e.target.newTask.value;
 
      const response = axios.put(`http://localhost:5000/todo/${elem.id}`, {
        name: task,
      });
      setTodos(response.data);
      setTodos(toDos.map((todo) => todo.id == elem.id));


  };

  return (
    <div className="todos">
      <form onSubmit={handleClick}>
        <input type="text" name="task" placeholder="Enter your todo ..." className="form-input" />
        <button>Add Todo</button>
      </form>
      <div>
        {toDos.map((elem, i) => (
          <Todo
            key={i}
            elem={elem}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            className="todo"
          />
        ))}
      </div>
    </div>
  );
};
export default Todos;
