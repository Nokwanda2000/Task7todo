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

  const handleAddTask = () => {
    axios.post('http://localhost:3001/todo', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', priority: 'medium' });
        alert('Task successfully added')
      })
      .catch(error => {
        console.error(error);
       
      });
  };

  const handleUpdateTask = (task) => {
    axios.put(`http://localhost:3001/todo/${task.id}`, task)
      .then(response => {
        setTasks(tasks.map(t => t.id === task.id ? task : t));
        setEditingTask(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/todo/${taskId}`)
      .then(response => {
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
    <div className='todo' style={{fontFamily: "sans-serif",
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // width: "500px",
      // margin: "0 auto",
      // border:"1px ipx solid",
      // backgroundColor: "white",
      // borderRadius: "10px",
      // boxShadow: "#333",
      // justifyContent:"center",
      // padding:"20px"

      }}>

      <h1 style={{color:"purple"}}>Welcome to your todos page</h1>

      <p style={{color:"green"}}>Please add your todos</p>
      <form className='todo-form' style={{
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto', // Center the form horizontally
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9'
}}>
  <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Add New Task</h2>

  <label style={{
    marginBottom: '15px',
    fontSize: '16px',
    color: '#555'
  }}>
    Title:
    <input
      style={{
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        marginTop: '5px',
        fontSize: '16px'
      }}
      type="text"
      value={newTask.title}
      onChange={(event) => setNewTask({ ...newTask, title: event.target.value })}
      placeholder='Enter task title'
    />
  </label>

  <label style={{
    marginBottom: '15px',
    fontSize: '16px',
    color: '#555'
  }}>
    Description:
    <input
      style={{
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        marginTop: '5px',
        fontSize: '16px'
      }}
      type="text"
      value={newTask.description}
      onChange={(event) => setNewTask({ ...newTask, description: event.target.value })}
      placeholder='Enter task description'
    />
  </label>

  <label style={{
    marginBottom: '20px',
    fontSize: '16px',
    color: '#555'
  }}>
    Priority:
    <select
      style={{
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        marginTop: '5px',
        fontSize: '16px'
      }}
      value={newTask.priority}
      onChange={handlePriorityChange}
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </label>

  <button
    style={{
      padding: '12px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease'
    }}
    type="submit"
    onClick={handleAddTask}
  >
    Add Task
  </button>
</form>

      <ul style={{ listStyle: "none",
  padding: "0",
  marginBottom: "20px",}}>
        {tasks.map((task) => (
          <li key={task.id} style={{ backgroundColor: "#f4f4f4",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "10px"}}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <button style={{  backgroundColor: "#008CBA",
  color: "white"}} className='edit-btn' onClick={() => setEditingTask(task)}>Edit</button>
            <button style={{ backgroundColor: "#f44336",
  color:"white",}} className='delete-btn' onClick={() => handleDeleteTask(task.id)}>Delete</button>
            {editingTask === task && (
              <form >
                <label style={{ marginBottom: "5px"}}>
                  Title:
                  <input style={{padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px"}} type="text" value={editingTask.title} onChange={(event) => handleEditTaskChange(event, 'title')} />
                </label>
                <br />
                <label style={{ marginBottom: "5px"}}>
                  Description:
                  <input style={{padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px"}} type="text" value={editingTask.description} onChange={(event) => handleEditTaskChange(event, 'description')} />
                </label>
                <br />
                <br></br>
                <label style={{ marginBottom: "5px"}}>
                  Priority:
                  <br></br>
                  <select style={{padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px"}} value={editingTask.priority} onChange={(event) => handleEditTaskChange(event, 'priority')}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">High</option>
                  </select>
                </label>
                <br />
                <button type="submit" onClick={() => handleUpdateTask(editingTask)}>Update Task</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Todo;


















// // frontend/src/components/Todo.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Todo = () => {
//   // const [todos, setTodos] = useState([]);

//   // useEffect(() => {
//   //   const fetchTodos = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:5000/todo');
//   //       setTodos(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching todos:', error);
//   //     }
//   //   };

//   //   fetchTodos();
//   // }, []);

  

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <p>Home: {todo.home}</p>
//             <p>Work: {todo.work}</p>
//             <p>Other: {todo.other}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Todo;