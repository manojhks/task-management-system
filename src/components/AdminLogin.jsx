import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from 'reactstrap';
import { motion } from 'framer-motion';

export const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const nav = useNavigate();

    const handleAdminKey = (e) =>{
        const {name, value} = e.target;
        setPassword({
            ...password,[name] : value
        });
    };

    const handleAdminLogin = async() =>{
        try {
            const response = await axios.get('http://localhost:3001/admin')
            const res = response.data
            
            const adminPassword = res.find(item=>item.passkey)
            // console.log(adminPassword);
            // console.log(password)
            if(adminPassword.passkey === password.passkey)
            {
                setSuccess("Secret key matched. Logging in...")
                setError("")
                setTimeout(() => {
                    setPassword("")
                    nav('/admin')
                }, 3000);
            }
            else{
                setError("Incorrect Secret key. Contact Your Admin")
                setSuccess("")
                setPassword("")
                console.error("Incorrect passkey")
            }

        } catch (error) {
            console.error("Secret key in incorrect",error)
        }
    };
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
    <motion.div className='adminlogin'
    initial={{width:0, opacity:0}}
    animate={{width:"100vw" , opacity:1}}
    exit={{opacity: 0,x:window.innerWidth , transition:{duration: 0.2}}}
    >
        <div className='adminloginDash'>
            <label className='inputhead'>Admin Login</label>
            <div className='text-start'>
            <label className='inputlabel' htmlFor='adminIn'>Secret key :</label>
            <Input id='adminIn' className='input' type='password' name='passkey' placeholder='Secret key please...' onChange={handleAdminKey} />
            </div>
            <button className='click' onClick={handleAdminLogin} ><p>Login</p></button>
            {success&& <p style={{backgroundColor:"#ffc0cb",marginBottom:"-15px",borderRadius:"3px",color:"green"}} >{success}</p>}
            {error&& <p style={{backgroundColor:"#ffc0cb",marginBottom:"-15px",borderRadius:"3px",color:"red"}} >{error}</p>}
        </div>
    </motion.div>
  )
}
