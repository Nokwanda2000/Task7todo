import React, { useState } from 'react';

export default function Todo() {
  const [lists, setLists] = useState([
    { id: 1, name: 'Home', todos: [] },
    { id: 2, name: 'Work', todos: [] },
    { id: 3, name: 'Other', todos: [] },
  ]);

  const [selectedList, setSelectedList] = useState(lists[0]);

  const handleListChange = (listId) => {
    const newList = lists.find((list) => list.id === listId);
    setSelectedList(newList);
  };

  const handleTodoChange = (todoId, completed) => {
    const newList = [...selectedList.todos];
    const todoIndex = newList.findIndex((todo) => todo.id === todoId);
    newList[todoIndex].completed = completed;
    setSelectedList({ ...selectedList, todos: newList });
  };

  const handleAddTodo = (text) => {
    const newTodo = { id: Math.random(), text, completed: false };
    setSelectedList({ ...selectedList, todos: [...selectedList.todos, newTodo] });
  };
  
  const handleDeleteTodo = (todoId) => {
    const newList = [...selectedList.todos];
    const todoIndex = newList.findIndex((todo) => todo.id === todoId);
    newList.splice(todoIndex, 1);
    setSelectedList({ ...selectedList, todos: newList });
  };

  return (
    <div className="container" style={{
      display: "flex",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    }}>

      <div className="list-container" style={{
        width: "300px",
        padding: "20px",
        borderRight: "1px solid #eee",
      }}>

        <h2 className="list-title" style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          marginBottom: "15px",
        }}>Lists</h2>

        {lists.map((list) => (
          <div key={list.id} className="list-item" style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #eee",
          }}>
            <input type="checkbox" checked={selectedList.id === list.id} onChange={() => handleListChange(list.id)} />
            <span>{list.name}</span>
            <span className="arrow" style={{ marginLeft: "auto", fontSize: "1.2rem" }}>→</span>
          </div>
        ))}
      </div>

      <div className="todo-container" style={{
        width: "300px",
        padding: "20px",
      }}>
        <h2 className="todo-title" style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          marginBottom: "15px",
        }}>{selectedList.name}</h2>

        {selectedList.todos.map((todo) => (
          <div key={todo.id} className="todo-item" style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #eee",
          }}>
            <input type="checkbox" checked={todo.completed} onChange={(e) => handleTodoChange(todo.id, e.target.checked)} />
            <span className="circle" style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              border: "2px solid #ccc",
              marginRight: "10px",
              backgroundColor: todo.completed ? "#4CAF50" : "#fff",
            }}></span>
            <span>{todo.text}</span>
          </div>
        ))}

        <button className="add-button" style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
          marginTop: "15px",
        }} onClick={() => handleAddTodo(prompt("Enter new todo:"))}>+</button>

<button className="add-button" style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
          marginTop: "15px",
        }} onClick={() => handleDeleteTodo(prompt("Delete new todo:"))}>+</button>
      </div>
    </div>
  );
}