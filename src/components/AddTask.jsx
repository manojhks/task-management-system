import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import UserNameContext from '../context/UsernameContext';
import { Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export const AddTask = () => {
  const { username } = useContext(UserNameContext);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Low",
    time: "",
    deadline: "",
    username:username
  });
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (!newTask.title || !newTask.description || !newTask.status || !newTask.priority || !newTask.deadline) {
      setErrorMessage("All fields are required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const currentTime = new Date().toLocaleString();
    const taskWithIdAndTime = {
      ...newTask,
      id: Date.now(),
      time: currentTime
    };

    try {
      await axios.post('http://localhost:3001/task', taskWithIdAndTime);
      const usersResponse = await axios.get('http://localhost:3001/users');
      const user = usersResponse.data.find(item => item.username === username);

      if (user) {
        const updatedUser = {
          ...user,
          tasks: [...(user.tasks || []), taskWithIdAndTime]
        };
        await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
      }

      nav('/user');
    } catch (error) {
      console.error("Error saving task:", error);
      setErrorMessage("Failed to save the task. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  return (
    <motion.div className='addtask'
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
      style={{ backgroundColor: "#00000050", minHeight: "100vh" }}
    >
      <div className='addtaskdash m-4'>
        <label className='inputhead'>New Task</label>
        <span className='bi bi-x close' title='close' onClick={() => nav('/user')}></span>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        {/* Input Fields */}
        <div className='text-start d-flex flex-column mt-3'>
          <label className='inputlabel'>Title :</label>
          <Input className='input' type='text' name='title' value={newTask.title} onChange={handleInputChange} />
        </div>

        <div className='text-start d-flex flex-column mt-3'>
          <label className='inputlabel'>Description :</label>
          <Input className='input' type='text' name='description' value={newTask.description} onChange={handleInputChange} />
        </div>

        <div className='text-start d-flex flex-column mt-3'>
          <label className='inputlabel mb-2'>Status </label>
          <div>
            <Input className='ms-3 align-top' type='radio' name='status' value="Pending" disabled checked={newTask.status === "Pending"} onChange={handleInputChange} />
            <label className='inputlabel fs-6 fw-normal align-baseline ms-1'>Pending</label>
          </div>
          <div>
            <Input className='ms-3 align-top' type='radio' name='status' disabled value="Approved" checked={newTask.status === "Approved"} onChange={handleInputChange} />
            <label className='inputlabel fs-6 fw-normal align-baseline ms-1'>Approved</label>
          </div>
          <div>
            <Input className='ms-3 align-top' type='radio' name='status' disabled value="Completed" checked={newTask.status === "Completed"} onChange={handleInputChange} />
            <label className='inputlabel fs-6 fw-normal align-baseline ms-1'>Completed</label>
          </div>
        </div>

        <div className='text-start my-3'>
          <label className='inputlabel mb-2'>Deadline :</label>
          <Input type='date' name='deadline' value={newTask.deadline} onChange={handleInputChange} />
        </div>

        <div>
          <button className='click' onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </motion.div>
  );
};
