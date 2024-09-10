import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/todo')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddTask = (event) => {
    event.preventDefault(); // Prevent page reload
    axios.post('http://localhost:3001/todo', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', priority: 'medium' });
        alert('Task successfully added');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateTask = (event) => {
    event.preventDefault(); // Prevent page reload
    axios.put(`http://localhost:3001/todo/${editingTask.id}`, editingTask)
      .then(response => {
        setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
        setEditingTask(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/todo/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handlePriorityChange = (event) => {
    setNewTask({ ...newTask, priority: event.target.value });
  };

  const handleEditTaskChange = (event, field) => {
    setEditingTask({ ...editingTask, [field]: event.target.value });
  };

  return (
    <div className='todo' style={{ fontFamily: "Arial, sans-serif", display: "flex", alignItems: "center", justifyContent:"center" }}>
      <h1 style={{ color: "purple" }}>Welcome to your todos page</h1>
      <p style={{ color: "green" }}>Please add your todos</p>
      
      <form className='todo-form' onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9', justifyContent: "center" }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Add New Task</h2>

        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          <input style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="text" value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })} placeholder='Enter task title' />
        </label>

        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          <input style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', marginTop: '5px', fontSize: '16px' }} type="text" value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} placeholder='Enter task description' />
        </label>

        <label style={{ marginBottom: '20px', fontSize: '16px', color: '#555' }}>
          Priority:
          <select style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', marginTop: '5px', fontSize: '16px' }} value={newTask.priority} onChange={handlePriorityChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button style={{ padding: '12px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background-color 0.3s ease', width: "200px" }} type="submit">
          Add Task
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: "0", marginBottom: "20px" }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "4px", marginBottom: "10px" }}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <button style={{ backgroundColor: "#008CBA", color: "white" }} className='edit-btn' onClick={() => setEditingTask(task)}>Edit</button>
            <button style={{ backgroundColor: "#f44336", color: "white" }} className='delete-btn' onClick={() => handleDeleteTask(task.id)}>Delete</button>

            {editingTask?.id === task.id && (
              <form onSubmit={handleUpdateTask}>
                <label style={{ marginBottom: "5px" }}>
                  Title:
                  <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} type="text" value={editingTask.title} onChange={(event) => handleEditTaskChange(event, 'title')} />
                </label>
                <br />
                <label style={{ marginBottom: "5px" }}>
                  Description:
                  <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} type="text" value={editingTask.description} onChange={(event) => handleEditTaskChange(event, 'description')} />
                </label>
                <br />
                <label style={{ marginBottom: "5px" }}>
                  Priority:
                  <br />
                  <select style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} value={editingTask.priority} onChange={(event) => handleEditTaskChange(event, 'priority')}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
                <br />
                <button style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">Update Task</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
