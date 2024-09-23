// // import React, { useContext, useState } from 'react'
// // import { motion } from 'framer-motion'
// // import axios from 'axios'
// // import UserNameContext from '../context/UsernameContext';


// // export const CreateTask = () => {
// //   const { username } = useContext(UserNameContext);
// //   const [tasks, displayTask] = useState([])
// //   const [toggle, setToggle] = useState(false)
// //   const YourTask = async() => {
// //     try {
// //       const response = await axios.get(`http://localhost:3001/users`)
// //       const res = response.data
// //       console.log(res)
// //       const oldTasks = res.flatMap((item) => item.tasks? item.tasks : [])
// //       displayTask(oldTasks)
// //       setToggle((prev) => !prev)
// //     } catch (error) {
// //       console.error(error)
// //     }
// //   }

// //   return (
// //     <motion.div
// //       initial={{ width: 0, opacity: 0 }}
// //       animate={{ width: "100%", opacity: 1 }}
// //       exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
// //       style={{position:"relative",top:"79px",padding:"0"}} className='container'
// //     >
// //       <div className=' yourtask d-flex justify-content-start  pt-5'>
// //   <button className='click create ytask' onClick={() => YourTask()}>
// //     <i className='yt'>Your tasks</i>
// //   <p className=' toggle' style={{ cursor: 'pointer', marginLeft: '10px' }}>
// //     {toggle ?
// //     (<i className='bi bi-caret-down-fill'></i>) : (<i className='bi bi-caret-left-fill'></i>
// //     )}
// //   </p>
// //   </button>
// //   <button className='click ytask p-0'><i>Add task</i> <i className='bi bi-plus'></i></button>
// // </div>

// //       <div className='container'>{toggle && ( tasks.length > 0 ? (
// //         <div className='gap-3' style={{ height: "fit-content", width: "fit-content", display:"flex", flexWrap:"wrap" ,position:"relative",top:"79px" }}>
// //           {tasks.map((task, index) => (
// //             <div className='taskbox' key={index}>
// //               <p className='taskbox-title'><i>Title:</i> <span className='fw-bolder' style={{color:"#3d252a"}}>{task.title}</span> </p>
// //               <p className='taskbox-description'><i>Description:</i> <span>{task.description}</span> </p>
// //               <p className='taskbox-status'><i>Status:</i> <span style={{backgroundColor: task.status.toLowerCase() === "approved" ? "#4CAF50" : "#FFC72C",color:"white", padding:"5px 10px", borderRadius:"20px"}}>{task.status}</span> </p>
// //               <p className='taskbox-priority'><i>Priority:</i> <span style={{backgroundColor: task.priority.toLowerCase() === "high" ? "#F00009" : task.priority.toLowerCase() === "medium" ? "#FFC72C" : "#4CAF50", color:"white", padding:"5px 10px", borderRadius:"20px"}} >{task.priority}</span> </p>
// //             </div>
// //           ))}
// //         </div>
// //       ) : <p style={{fontSize:"20px", padding:"20px", fontWeight:"500"}}>Create a new task to make it visible here.</p>)}</div>
// //     </motion.div>
// //   )
// // }






// import React, { useContext, useState } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import UserNameContext from '../context/UsernameContext';
// import { useNavigate } from 'react-router-dom';

// export const CreateTask = () => {
//   const nav = useNavigate()
//   const { username } = useContext(UserNameContext);
//   const [tasks, displayTask] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchUserTasks = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:3001/users?username=${username}`);
//       const user = response.data[0];
//       console.log(user);

//       if (user && user.tasks) {
//         displayTask(user.tasks);
//       } else {
//         displayTask([]);
//       }

//       setToggle((prev) => !prev);
//       setError("");
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       setError("Failed to fetch tasks. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ width: 0, opacity: 0 }}
//       animate={{ width: "100%", opacity: 1 }}
//       exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
//       style={{ position: "relative", top: "79px", padding: "0" }} className='container'
//     >
//       <div className=' yourtask d-flex justify-content-start  pt-5'>
//         <button className='click create ytask' onClick={fetchUserTasks}>
//           <i className='yt'>Your tasks</i>
//           <p className=' toggle' style={{ cursor: 'pointer', marginLeft: '10px' }}>
//             {toggle ? (<i className='bi bi-caret-down-fill'></i>) : (<i className='bi bi-caret-left-fill'></i>)}
//           </p>
//         </button>
//         <button onClick={()=> (nav('/addtask')) } className='click ytask p-0'><i>Add task</i> <i className='bi bi-plus'></i></button>
//       </div>

//       {loading && <p>Loading tasks...</p>}

//       <div className='container'>
//         {toggle && (
//           tasks.length > 0 ? (
//             <div className='gap-3' style={{ height: "fit-content", width: "fit-content", display: "flex", flexWrap: "wrap", position: "relative", top: "79px" }}>
//               {tasks.map((task, index) => (
//                 <div className='taskbox' key={index}>
//                   <p className='taskbox-title'><i>Title:</i> <span className='fw-bolder' style={{ color: "#3d252a" }}>{task.title}</span></p>
//                   <p className='taskbox-description'><i>Description:</i> <span>{task.description}</span></p>
//                   <p className='taskbox-status'><i>Status:</i> <span style={{ backgroundColor: task.status.toLowerCase() === "approved" ? "#4CAF50" : "#FFC72C", color: "white", padding: "5px 10px", borderRadius: "20px" }}>{task.status}</span></p>
//                   <p className='taskbox-priority'><i>Priority:</i> <span style={{ backgroundColor: task.priority.toLowerCase() === "high" ? "#F00009" : task.priority.toLowerCase() === "medium" ? "#FFC72C" : "#4CAF50", color: "white", padding: "5px 10px", borderRadius: "20px" }}>{task.priority}</span></p>
//                   <p className='taskbox-username'><i>Asignee:</i> @{username}</p>
//                 </div>
//               ))}
//             </div>
//           ) : <p style={{ fontSize: "20px", padding: "20px", fontWeight: "500" }}>Create a new task to make it visible here.</p>
//         )}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>
//     </motion.div>
//   );
// };



// import React, { useContext, useState } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import UserNameContext from '../context/UsernameContext';
// import { useNavigate } from 'react-router-dom';

// export const CreateTask = () => {
//   const nav = useNavigate();
//   const { username } = useContext(UserNameContext);
//   const [tasks, displayTask] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchUserTasks = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:3001/users?username=${username}`);
//       const user = response.data[0];
//       console.log(user);

//       if (user && user.tasks) {
//         displayTask(user.tasks);
//       } else {
//         displayTask([]);
//       }

//       setToggle((prev) => !prev);
//       setError("");
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       setError("Failed to fetch tasks. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigate to the Edit Task page with the task ID
//   const handleEditClick = (taskId) => {
//     nav(`/addtask/${taskId}`);
//   };

//   return (
//     <motion.div
//       initial={{ width: 0, opacity: 0 }}
//       animate={{ width: "100%", opacity: 1 }}
//       exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
//       style={{ position: "relative", top: "79px", padding: "0" }} className='container'
//     >
//       <div className='yourtask d-flex justify-content-start pt-5'>
//         <button className='click create ytask' onClick={fetchUserTasks}>
//           <i className='yt'>Your tasks</i>
//           <p className='toggle' style={{ cursor: 'pointer', marginLeft: '10px' }}>
//             {toggle ? (<i className='bi bi-caret-down-fill'></i>) : (<i className='bi bi-caret-left-fill'></i>)}
//           </p>
//         </button>
//         <button onClick={() => nav('/addtask')} className='click ytask p-0'><i>Add task</i> <i className='bi bi-plus'></i></button>
//       </div>

//       {loading && <p>Loading tasks...</p>}

//       <div className='container'>
//         {toggle && (
//           tasks.length > 0 ? (
//             <div className='gap-3' style={{ height: "fit-content", width: "fit-content", display: "flex", flexWrap: "wrap", position: "relative", top: "79px" }}>
//               {tasks.map((task, index) => (
//                 <div className='taskbox' key={index}>
//                   <p className='taskbox-title'><i>Title:</i> <span className='fw-bolder' style={{ color: "#3d252a" }}>{task.title}</span></p>
//                   <p className='taskbox-description'><i>Description:</i> <span>{task.description}</span></p>
//                   <p className='taskbox-status'><i>Status:</i> <span style={{ backgroundColor: task.status.toLowerCase() === "approved" ? "#4CAF50" : "#FFC72C", color: "white", padding: "5px 10px", borderRadius: "20px" }}>{task.status}</span></p>
//                   <p className='taskbox-priority'><i>Priority:</i> <span style={{ backgroundColor: task.priority.toLowerCase() === "high" ? "#F00009" : task.priority.toLowerCase() === "medium" ? "#FFC72C" : "#4CAF50", color: "white", padding: "5px 10px", borderRadius: "20px" }}>{task.priority}</span></p>
//                   <p className='taskbox-username'><i>Assignee:</i> @{username}</p>

//                   {/* Edit button */}
//                   <button className='edit-task-btn' onClick={() => handleEditClick(task.id)}><i className='bi bi-pen'></i></button>
//                 </div>
//               ))}
//             </div>
//           ) : <p style={{ fontSize: "20px", padding: "20px", fontWeight: "500" }}>Create a new task to make it visible here.</p>
//         )}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>
//     </motion.div>
//   );
// };





import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import UserNameContext from '../context/UsernameContext';
import { useNavigate } from 'react-router-dom';

export const CreateTask = () => {
  const nav = useNavigate();
  const { username } = useContext(UserNameContext);
  const [tasks, setTasks] = useState([]); // Renamed for clarity
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/users?username=${username}`);
      const user = response.data[0];
      console.log(user);

      if (user && user.tasks) {
        setTasks(user.tasks);
      } else {
        setTasks([]);
      }

      setToggle((prev) => !prev);
      setError("");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (taskId) => {
    nav(`/edittask/${taskId}`);
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
      style={{ position: "relative", top: "79px", padding: "0" }} className='container'
    >
      <div className='yourtask d-flex justify-content-start pt-5'>
        <button className='click create ytask' onClick={fetchUserTasks}>
          <i className='yt'>Your tasks</i>
          <p className='toggle' style={{ cursor: 'pointer', marginLeft: '10px' }}>
            {toggle ? (<i className='bi bi-caret-down-fill'></i>) : (<i className='bi bi-caret-left-fill'></i>)}
          </p>
        </button>
        <button onClick={() => nav('/addtask')} className='click ytask p-0'><i>Add task</i> <i className='bi bi-plus'></i></button>
      </div>

      {loading && <p>Loading tasks...</p>}

      <div className='container'>
        {toggle && (
          tasks.length > 0 ? (
            <div className='gap-3' style={{ height: "fit-content", width: "fit-content", display: "flex", flexWrap: "wrap", position: "relative", top: "79px" }}>
              {tasks.map((task) => (
                <div className='taskbox' key={task.id}>
                  <p className='taskbox-title'><i>Title:</i> <span className='fw-bolder' style={{ color: "#3d252a" }}>{task.title}</span></p>
                  <p className='taskbox-description'><i>Description:</i> <span>{task.description}</span></p>
                  <p className='taskbox-status'><i>Status:</i> <span style={{ backgroundColor: task.status.toLowerCase() === "approved" ? "#4CAF50" : "#FFC72C", color: "white", padding: "5px 10px", borderRadius: "20px" }}>{task.status}</span></p>
                  <p className='taskbox-priority'><i>Priority:</i> <span style={{ backgroundColor: task.priority.toLowerCase() === "high" ? "#F00009" : task.priority.toLowerCase() === "medium" ? "#FFC72C" : "#4CAF50", color: "white", padding: "5px 10px", borderRadius: "20px" }}>{task.priority}</span></p>
                  <p className='taskbox-username'><i>Assignee:</i> @{username}</p>

                  {/* Edit button */}
                  <button className='edit-task-btn' onClick={() => handleEditClick(task.id)}><i className='bi bi-pen'></i></button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "20px", padding: "20px", fontWeight: "500" }}>Create a new task to make it visible here.</p>
          )
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </motion.div>
  );
};
