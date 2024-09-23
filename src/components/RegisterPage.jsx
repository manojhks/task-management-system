import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from 'reactstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const nav = useNavigate()
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [success ,setSuccess] = useState("")
  const [error ,setError] = useState("")

  const checkUsername = async(username) => {
    try{
    const response = await axios.get(`http://localhost:3001/users?username=${username.toLowerCase()}`)
    const res = response.data
    if(res.length === 0){
      setUsernameAvailable(true)
    }
    else{
      setUsernameAvailable(false)
    }
  }
  catch(error){
    console.error(error)
  }
}
  useEffect(() =>{
   const timer = setTimeout(() => {
    if(register.username){
      checkUsername(register.username.toLowerCase())
    }
   }, 500);
   return () => clearTimeout(timer)
  },[register.username])

  const handleRegisterInput = (e) =>{
    const {name, value} = e.target
    setRegister({
      ...register,
      [name]: name === 'username' ? value.toLowerCase() : value
    })
  }
  
  const handleRegister = async() =>{
    if (usernameAvailable === false) {
      setError("Username is already taken")
      return
    }
    try {
      const response = await axios.get('http://localhost:3001/users')
      const res = response.data
      const match = res.find(item => item.email === register.email)
      
      if(match){
        setSuccess("User already exists. Navigating to Login page...")
        setError("")
        setTimeout(() => {
          nav('/login')
        }, 3000);
      }
      else{
        const reg = await axios.post('http://localhost:3001/users', register)
        setSuccess("Registered successfully. Navigating to Login page...")
        setError("")
        setTimeout(() => {
          nav('/login')
        }, 3000);
      }
    } catch (error) {
      console.error(error)
    }
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

  return (
    <motion.div className='login'
      initial={{width:0, opacity:0}}
      animate={{width:"100%", opacity:1}}
      exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
    >
      <div className='userloginDash'>
        <label className='inputhead'>User Register</label>

        <div className='text-start'>
          <label className='inputlabel mt-3'>Username :</label>
          <Input required className='input' type='text' name='username' value={register.username} placeholder='Enter your username' onChange={handleRegisterInput} />
        </div>

        <div className='text-start mt-3'>
          <label className='inputlabel'>Email :</label>
          <Input required className='input' type='email' name='email' value={register.email} placeholder='Enter your email' onChange={handleRegisterInput} />
        </div>

        <div className='text-start mt-3'>
          <label className='inputlabel'>Password :</label>
          <Input required className='input' type='password' name='password' value={register.password} placeholder='Enter your password' onChange={handleRegisterInput} />
        </div>

        <div className='mt-4'>
          <button className='click pt-2' onClick={handleRegister}>
            <p>Register</p>
          </button>
        </div>

        {success && <p style={{marginTop:"5px", marginBottom:"-15px", borderRadius:"3px", color:"#ffc0cb", textShadow:"1px 1px black"}}>{success}</p>}
        {error && <p style={{marginTop:"5px", marginBottom:"-15px", borderRadius:"3px", color:"#ffc0cb", textShadow:"1px 1px black"}}>{error}</p>}
      </div>
    </motion.div>
  )
}
