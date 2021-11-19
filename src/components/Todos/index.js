import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Todo from "../Todo";
const Todos = () => {
  const [toDos, setTodos] = useState([]);
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
    if (e.target.task.value) {
      //check if text field is empty or not
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
        console.log("dele");
        const response = axios.put(`http://localhost:5000/delTodo/${elem.id}`);
        setTodos(response.data);
        setTodos(toDos)
    };

  return (
    <div>
      <h1> ToDoList</h1>
      <form onSubmit={handleClick}>
        <input type="text" name="task" />
        <button>Add Task</button>
      </form>
      <div>
        {toDos.map((elem,i) => (
          <Todo key={i} elem={elem} deleteTodo={deleteTodo}/>
        ))}
      </div>
    </div>
  );
};
export default Todos;