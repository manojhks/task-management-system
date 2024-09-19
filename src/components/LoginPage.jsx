import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from 'reactstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const nav = useNavigate()
  const [login, setLogin] = useState({
    email:"",
    password:""
  })
  const [success ,setSuccess] = useState("")
  const [error ,setError] = useState("")

  const handleLoginInput = (e) =>{
    const {name, value} = e.target
    setLogin({
      ...login,[name]:value
    })
  }
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const handleLogin = async() =>{
    try {
      const response = await axios.get('http://localhost:3001/users')
      const res = response.data
      if(res.email === login.email && res.password === login.password){
        setSuccess("Credentials matched. Logging in...")
        setError("")
        setTimeout(() => {
          nav('/admin')
        }, 3000);
      }
      else{
        setError("Invalid Credentials")
        setSuccess("")
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <motion.div className='login'
    initial={{width:0, opacity:0}}
    animate={{width:"100vw" , opacity:1}}
    exit={{opacity: 0,x:window.innerWidth , transition:{duration: 0.2}}}
    >
    <div className='userloginDash'>
    <label className='inputhead'>User Login</label>
            <div className='text-start'>
            <label className='inputlabel mt-3'>Email :</label>
            <Input required className='input' type='email' name='email' value={login.email} placeholder='Enter your email' onChange={handleLoginInput} />
            </div>
            <div className='text-start mt-3'>
            <label className='inputlabel'>Password :</label>
            <Input required className='input' type='password' name='password' value={login.password} placeholder='Enter your password' onChange={handleLoginInput} />
            </div>
            <div className='mt-4'><button className='click' onClick={handleLogin}><p>Login</p></button></div>
            {success&& <p style={{backgroundColor:"#ffc0cb",marginTop:"5px",marginBottom:"-15px",borderRadius:"3px",color:"green"}} >{success}</p>}
            {error&& <p style={{backgroundColor:"#ffc0cb",marginTop:"5px",marginBottom:"-15px",borderRadius:"3px",color:"red"}} >{error}</p>}

    </div>
    </motion.div>
  )
}
