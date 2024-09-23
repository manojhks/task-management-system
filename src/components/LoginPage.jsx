// import React, { useContext, useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { Input } from 'reactstrap'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import userName from '../context/UsernameContext'

// export const LoginPage = () => {
//   const nav = useNavigate()
//   const {setUsername} = useContext(userName);
//   const [login, setLogin] = useState({
//     userName:"",
//     password:""
//   })
//   const [success ,setSuccess] = useState("")
//   const [error ,setError] = useState("")

//   const handleLoginInput = (e) =>{
//     const {name, value} = e.target
//     setLogin({
//       ...login,[name]:value
//     })
//   }
//   const handleLogin = async() =>{
//     try {
//       const response = await axios.get('http://localhost:3001/users')
//       const res = response.data
//       console.log(res)
//       const match = res.find(item=>(item.username === login.userName) && item.password === login.password)
//       if(match){
//         setUsername(match.username)
//         setSuccess("Credentials matched. Logging in...")
//         setError("")
//         setLogin({
//           userName:"",
//           password:""
//         })
//         setTimeout(() => {
//           nav('/user')
//         }, 3000);
//       }
//       else{
//         setError("Invalid Credentials")
//         setSuccess("")
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         setSuccess(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   return (
//     <motion.div className='login'
//     initial={{width:0, opacity:0}}
//     animate={{width:"100vw" , opacity:1}}
//     exit={{opacity: 0,x:window.innerWidth , transition:{duration: 0.2}}}
//     >
//     <div className='userloginDash'>
//     <label className='inputhead'>User Login</label>
//             <div className='text-start'>
//             <label className='inputlabel mt-3'>Username :</label>
//             <Input required className='input' type='text' name='userName' value={login.userName} placeholder='Enter your username' onChange={handleLoginInput} />
//             </div>
//             <div className='text-start mt-3'>
//             <label className='inputlabel'>Password :</label>
//             <Input required className='input' type='password' name='password' value={login.password} placeholder='Enter your password' onChange={handleLoginInput} />
//             </div>
//             <div className='mt-4'><button className='click' onClick={handleLogin}><p>Login</p></button></div>
//             {success&& <p style={{marginTop:"5px",marginBottom:"-15px",borderRadius:"3px",color:"#ffc0cb",textShadow:"1px 1px black"}} >{success}</p>}
//             {error&& <p style={{marginTop:"5px",marginBottom:"-15px",borderRadius:"3px",color:"#ffc0cb",textShadow:"1px 1px black"}} >{error}</p>}

//     </div>
//     </motion.div>
//   )
// }





import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNameContext from '../context/UsernameContext';

export const LoginPage = () => {
  const nav = useNavigate();
  const { login } = useContext(UserNameContext);
  const [loginData, setLoginData] = useState({
    userName: "",
    password: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      const res = response.data;
      const match = res.find(item => (item.username === loginData.userName) && (item.password === loginData.password));
      if (match) {
        login(match.username);
        setSuccess("Credentials matched. Logging in...");
        setError("");
        setLoginData({
          userName: "",
          password: ""
        });
        setTimeout(() => {
          nav('/user');
        }, 1000);
      } else {
        setError("Invalid Credentials");
        setSuccess("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <motion.div className='login'
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
    >
      <div className='userloginDash'>
        <label className='inputhead'>User Login</label>
        <div className='text-start'>
          <label className='inputlabel mt-3'>Username:</label>
          <Input required className='input' type='text' name='userName' value={loginData.userName} placeholder='Enter your username' onChange={handleLoginInput} />
        </div>
        <div className='text-start mt-3'>
          <label className='inputlabel'>Password:</label>
          <Input required className='input' type='password' name='password' value={loginData.password} placeholder='Enter your password' onChange={handleLoginInput} />
        </div>
        <div className='mt-4'>
          <button className='click pt-2' onClick={handleLogin}><p>Login</p></button>
        </div>
        {success && <p style={{ marginTop: "5px", marginBottom: "-15px", borderRadius: "3px", color: "#ffc0cb", textShadow: "1px 1px black" }}>{success}</p>}
        {error && <p style={{ marginTop: "5px", marginBottom: "-15px", borderRadius: "3px", color: "#ffc0cb", textShadow: "1px 1px black" }}>{error}</p>}
      </div>
    </motion.div>
  );
};
