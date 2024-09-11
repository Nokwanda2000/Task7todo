import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/todo');
        setTasks(response.data);
      } catch (error) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (!newTask.title || !newTask.description) {
      alert('Please fill out all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/todo', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', priority: 'medium' });
      alert('Task successfully added');
    } catch (error) {
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault();
    if (!editingTask.title || !editingTask.description) {
      alert('Please fill out all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3001/todo/${editingTask.id}`, editingTask);
      setTasks(tasks.map(t => t.id === editingTask.id ? response.data : t));
      setEditingTask(null);
    } catch (error) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/todo/${taskId}`);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handlePriorityChange = (event) => {
    setNewTask({ ...newTask, priority: event.target.value });
  };

  const handleEditTaskChange = (event, field) => {
    setEditingTask({ ...editingTask, [field]: event.target.value });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'easy': return 'green';
      case 'medium': return 'purple';
      case 'hard': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className='todo' style={{ fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", padding: "20px", backgroundColor: "#f4f4f4" }}>
      <h1 style={{ color: "#3f51b5", marginBottom: "20px" }}>Welcome to Your Todos Page</h1>
      <p style={{ color: "#757575", marginBottom: "20px" }}>Please add your todos</p>

      {loading && <p style={{ color: '#00796b' }}>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form className='todo-form' onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Add New Task</h2>

        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Title:
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="text" value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })} placeholder='Enter task title' />
        </label>

        <label style={{ marginBottom: '15px', fontSize: '16px', color: '#555' }}>
          Description:
          <input style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="text" value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} placeholder='Enter task description' />
        </label>

        <label style={{ marginBottom: '20px', fontSize: '16px', color: '#555' }}>
          Priority:
          <select style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', marginTop: '5px' }} value={newTask.priority} onChange={handlePriorityChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button style={{ padding: '12px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background-color 0.3s ease' }} type="submit">
          Add Task
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: "0", marginTop: "20px", width: '100%', maxWidth: '400px' }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "4px", marginBottom: "10px", borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}>
            <h2 style={{ margin: "0 0 10px", color: "#333" }}>{task.title}</h2>
            <p style={{ margin: "0 0 5px" }}>{task.description}</p>
            <p style={{ margin: "0", fontWeight: 'bold', color: getPriorityColor(task.priority) }}>Priority: {task.priority}</p>
            <button style={{ backgroundColor: "#008CBA", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: '10px', fontSize: '14px' }} className='edit-btn' onClick={() => setEditingTask(task)}>Edit</button>
            <button style={{ backgroundColor: "#f44336", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: '14px' }} className='delete-btn' onClick={() => handleDeleteTask(task.id)}>Delete</button>

            {editingTask?.id === task.id && (
              <form onSubmit={handleUpdateTask} style={{ marginTop: '10px' }}>
                <label style={{ display: 'block', marginBottom: "5px" }}>
                  Title:
                  <input style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} type="text" value={editingTask.title} onChange={(event) => handleEditTaskChange(event, 'title')} />
                </label>
                <label style={{ display: 'block', marginBottom: "5px" }}>
                  Description:
                  <input style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} type="text" value={editingTask.description} onChange={(event) => handleEditTaskChange(event, 'description')} />
                </label>
                <label style={{ display: 'block', marginBottom: "5px" }}>
                  Priority:
                  <select style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px' }} value={editingTask.priority} onChange={(event) => handleEditTaskChange(event, 'priority')}>
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
