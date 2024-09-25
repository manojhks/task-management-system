import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AdminDashboard = () => {
  const nav = useNavigate()
  const [task, setTask] = useState([])
  const showTask =  async()=>{
    try {
      const response = await axios.get('http://localhost:3001/task')
      const data = response.data
      setTask(data)
    } catch (error) {
      console.error(error)
    }
  }
  const handleEditClick = (taskId) => {
    nav(`/adminedit/${taskId}`);
  };
  useEffect(()=>{
    showTask()
  },[])
  return (
    <motion.div
    initial={{width:0, opacity:0}}
    animate={{width:"100%" , opacity:1}}
    exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
    className='admindash'>
    <div className='adminnav' style={{height:"79.4px"}}>
    <div className='container  d-flex justify-content-between pt-3'>
    <h1 className='navbar-brand'>Admin</h1>
    <button className='btn logout text-light' onClick={()=> nav('/')}>Logout</button>
    </div>
    </div>

    <div className='container'>
    {task.length > 0 ? (
            <div className='gap-3' style={{ height: "fit-content", width: "fit-content", display: "flex", flexWrap: "wrap", position: "relative", top: "79px" }}>
              {task.map((task) => (
                <div className='taskbox' key={task.id}>
                  <p className='taskbox-title'><i>Title:</i> <span className='fw-bolder' style={{ color: "#3d252a" }}>{task.title}</span></p>
                  <p className='taskbox-description'><i>Description:</i> <span>{task.description}</span></p>
                  <p className='taskbox-status'><i>Status:</i> <span style={{ backgroundColor: task.status.toLowerCase() === "completed" ? "#4CAF50" : "#FFC72C", color: "white", padding: "5px 10px", borderRadius: "20px" }}>{task.status}</span></p>
                  <p className='taskbox-priority'><i>Priority:</i> <span style={{ backgroundColor: task.priority.toLowerCase() === "high" ? "#F00009" : task.priority.toLowerCase() === "medium" ? "#FFC72C" : "#4CAF50", color: "white", padding: "5px 10px", borderRadius: "20px" }}>{task.priority}</span></p>
                  <p className='taskbox-username'><i>Assignee:</i>@{task.username}</p>

                  <button className='edit-task-btn' onClick={() => handleEditClick(task.id)}>Edit <i className='bi bi-pencil'></i></button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "20px", padding: "20px", fontWeight: "500" }}>No tasks created yet.</p>
          )}
    </div>
    </motion.div>
  )
}
