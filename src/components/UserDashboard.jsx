import React from 'react'
import { Navbar } from './Navbar'
import { motion } from 'framer-motion'
import { CreateTask } from './CreateTask'

export const UserDashboard = () => {
  return (
    <motion.div className='userdash'
    initial={{width:0, opacity:0}}
    animate={{width:"100%" , opacity:1}}
    exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.05 } }}
    >
      <Navbar/>
      <CreateTask/>
    </motion.div>
  )
}
