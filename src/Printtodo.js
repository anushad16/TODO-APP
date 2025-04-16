import React from "react";

const Printtodo = ({ todos, toggleComplete, deleteHandler }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <div
          key={index}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <div>
            <p>
              <strong>{todo.task}</strong>
            </p>
            <p style={{ fontSize: "0.9em", color: "#6b7280" }}>
              Due: {todo.dueDate}
            </p>
          </div>
          <div className="todo-buttons">
            <button
              onClick={() => toggleComplete(index)}
              className={`complete-btn ${todo.completed ? "completed" : ""}`}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteHandler(index)} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Printtodo;
