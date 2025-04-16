import React, { useState } from "react";
import Printtodo from "./Printtodo";
import "./App.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task && dueDate) {
      setTodos([...todos, { task, dueDate, completed: false }]);
      setTask("");
      setDueDate("");
    }
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteHandler = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const exportCSV = () => {
    const header = ["Task", "Due Date", "Completed"];
    const rows = todos.map((todo) => [
      todo.task,
      todo.dueDate,
      todo.completed ? "Yes" : "No",
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todo-list.csv";
    a.click();
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "date") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "completed") return a.completed - b.completed;
    return 0;
  });

  return (
    <div className="todo-container">
      <h2 className="todo-title">📋 To-Do List App</h2>

      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="todo-controls">
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">Sort by</option>
          <option value="date">Due Date</option>
          <option value="completed">Completion</option>
        </select>
        <button onClick={exportCSV}>Export CSV</button>
      </div>

      <Printtodo
        todos={sortedTodos}
        toggleComplete={toggleComplete}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default Todo;
