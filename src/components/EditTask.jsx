import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import { motion } from 'framer-motion';
import UserNameContext from '../context/UsernameContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const EditTask = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Low",
        deadline: ""
    });
    const { username } = useContext(UserNameContext);
    const nav = useNavigate();
    const { taskId } = useParams();
    const [errorMessage, setErrorMessage] = useState("");

    const validateForm = () => {
        if (!task.title || !task.description || !task.status || !task.priority || !task.deadline) {
            setErrorMessage("All fields are required.");
            return false;
        }
        setErrorMessage("");
        return true;
    };
    const fetchTaskForEditing = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/task/${taskId}`);
            if (response.data) {
                setTask(response.data);
            } else {
                console.error("Task not found");
            }
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            await axios.put(`http://localhost:3001/task/${taskId}`, task);
            const usersResponse = await axios.get('http://localhost:3001/users');
            const user = usersResponse.data.find(item => item.username === username);

            if (user) {
                const updatedUser = {
                    ...user,
                    tasks: user.tasks.map(t => (t.id === Number(taskId) ? task : t))
                };
                await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
            }

            nav('/user');
        } catch (error) {
            console.error("Error updating task:", error);
            setErrorMessage("Failed to update the task. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value
        });
    };


    useEffect(() => {
        fetchTaskForEditing();
    }, [taskId]);

    return (
        <motion.div className='addtask'
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
            style={{ backgroundColor: "#00000050", minHeight: "100vh" }}
        >
            <div className='addtaskdash m-4'>
                <label className='inputhead'>Edit Task</label>
                <span className='bi bi-x close' title='close' onClick={() => nav('/user')}></span>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

                {/* Input Fields */}
                <div className='text-start d-flex flex-column mt-3'>
                    <label className='inputlabel'>Title :</label>
                    <Input className='input' type='text' name='title' value={task.title} onChange={handleInputChange} />
                </div>

                <div className='text-start d-flex flex-column mt-3'>
                    <label className='inputlabel'>Description :</label>
                    <Input className='input' type='text' name='description' value={task.description} onChange={handleInputChange} />
                </div>

                <div className='text-start d-flex flex-column mt-3'>
                    <label className='inputlabel mb-2'>Status </label>
                    {["Pending", "Approved", "Completed"].map(status => (
                        <div key={status}>
                            <Input className='ms-3 align-top' type='radio' name='status' value={status} checked={task.status === status} onChange={handleInputChange} />
                            <label className='inputlabel fs-6 fw-normal align-baseline ms-1'>{status}</label>
                        </div>
                    ))}
                </div>

                <div className='text-start my-3'>
                    <label className='inputlabel mb-2'>Deadline :</label>
                    <Input type='date' name='deadline' value={task.deadline} onChange={handleInputChange} />
                </div>

                <div>
                    <button className='click' onClick={handleSubmit}>Update Task</button>
                </div>
            </div>
        </motion.div>
    );
};
