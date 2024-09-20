import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import { motion } from 'framer-motion'

export const HomePage = () => {
    const nav = useNavigate()

    const navAdmin = () => {
        nav('/adminlogin')
    }
    const navLogin = () => {
        nav('/login')
    }
    const navRegister = () => {
        nav('/register')
    }
  return (
    <motion.div className='home'
    initial={{width:0, opacity:0}}
    animate={{width:"100%" , opacity:1}}
    exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
    >
    <div className='container buttons'>
    <Button outline className='home-button' size="lg" onClick={navAdmin} ><span className='home-button-icon'><i className="bi bi-person-fill-gear"></i></span>&nbsp;{' '}<span className='home-button-name'>Admin</span></Button>
    <Button outline className='home-button' size="lg" onClick={navLogin}><span className='home-button-icon'><i className="bi bi-person-fill-check"></i></span>&nbsp;{' '}<span className='home-button-name'>Existing User</span></Button>
    <Button outline className='home-button' size="lg" onClick={navRegister}><span className='home-button-icon'><i className="bi bi-person-fill-add"></i></span>&nbsp;{' '}<span className='home-button-name'>New User</span></Button>
    </div>
    </motion.div>
  )
}
