import React from 'react'

import { AdminDashboard } from './AdminDashboard';
import {RegisterPage} from './RegisterPage'
import {LoginPage} from './LoginPage'

import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './HomePage';
import { AdminLogin } from './AdminLogin';
import {UserDashboard} from './UserDashboard'
import { AddTask } from './AddTask';
import { EditTask } from './EditTask';
import { AdminEdit } from './AdminEdit';

export const AnimatedRoutes = () => {
    const location = useLocation()
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
    <Route path='/' element={<HomePage/>} />
    <Route path='/admin' element={<AdminDashboard/>} />
    <Route path='/adminlogin' element={<AdminLogin/>}/>
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/register' element={<RegisterPage/>} />
    <Route path='/user' element={<UserDashboard/>} />
    <Route path='/addtask'  element={<AddTask/>} />
    <Route path='/edittask/:taskId' element={<EditTask />} />
    <Route path='/adminedit/:taskId' element={<AdminEdit />} />
  </Routes>
  </AnimatePresence>
  )
}
