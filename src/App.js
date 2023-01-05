import React from "react";
import { useSelector, } from "react-redux";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Search from "./components/Search";

const App = () => {

  const todos = useSelector((state) => state.todos)
  
  return (
    <div className="wrapper">
      <h1 className="logo">Create New Job</h1>
      <h2>Job Name</h2>
      <TodoForm />
      <h1>Job List </h1>
      <Search />
      <TodoList todos={todos } />
    </div>
  );
};

export default App;