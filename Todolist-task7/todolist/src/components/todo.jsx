import React from 'react'

export default function Todo() {
  return (
    <div class="container" style={{display: "flex",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        padding: "20px"}}>

    <div class="list-container" style={{width: "300px",
padding: "20px",
borderRight: "1px solid #eee"}}>

        <h2 class="list-title" style={{fontSize: "1.2rem",
fontWeight: "bold",
marginBottom: "15px",}}>Lists</h2>

        <div class="list-item" style={{display: "flex",
alignItems: "center",
padding: "10px",
borderBottom: "1px solid #eee",}}>

            <input type="checkbox" style={{borderBottom: "none",}}/>
            <span>Home</span>
            <span class="arrow">→</span>
        </div>
        <div class="list-item" >
            <input type="checkbox" style={{marginRight: "10px"}}/>
            <span>Work</span>
            <span class="arrow" style={{marginLeft: "auto",
fontSize: "1.2rem",}}>→</span>
        </div>
        <div class="list-item">
            <input type="checkbox" style={{marginRight: "10px"}}/>
            <span>Other</span>
            <span class="arrow" style={{marginLeft: "auto",
fontSize: "1.2rem",}}>→</span>
        </div>
    </div>
    <div class="todo-container" style={{width: "300px",
padding: "20px",}}>
        <h2 class="todo-title" style={{fontSize: "1.2rem",
fontWeight: "bold",
marginBottom: "15px",}}>Home</h2>
        <div class="todo-item" style={{display: "flex",
alignItems: "center",
padding: "10px",
borderBottom: "1px solid #eee",}}>
            <input type="checkbox"/>
            <span class="circle"></span>
            <span>Buy milk</span>
        </div>
        <div class="todo-item" style={{display: "flex",
alignItems: "center",
padding: "10px",
borderBottom: "1px solid #eee",}}>
            <input type="checkbox"/>
            <span class="circle"></span>
            <span style={{borderBottom: "none"}}>Call mom</span>
        </div>
        <div class="todo-item" style={{display: "flex",
alignItems: "center",
padding: "10px",
borderBottom: "1px solid #eee",}}>
            <input type="checkbox"/>
            <span class="circle" style={{width: "15px",
height: "15px",
borderRadius: "50%",
border: "2px solid #ccc",
marginRight: "10px",}}></span>
            <span>Check mail</span>
        </div>
    <div class="todo-item" style={{display: "flex",
alignItems: "center",
padding: "10px",
borderBottom: "1px solid #eee",}}>
            <input type="checkbox" checked/>
            <span class="circle completed" style={{backgroundColor: "#4CAF50",
border: "none",}}></span>
            <span>Walk the dog</span>
        </div>
        <button class="add-button" style={{backgroundColor: "#4CAF50",
color: "white",
padding: "10px 20px",
border: "none",
borderRadius: "5px",
cursor: "pointer",
fontSize: "1rem",
marginTop: "15px",}}>+</button>
    </div>
</div>

  )
}
