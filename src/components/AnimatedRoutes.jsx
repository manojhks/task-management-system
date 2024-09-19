import React from 'react'

import { AdminDashboard } from './AdminDashboard';
import {RegisterPage} from './RegisterPage'
import {LoginPage} from './LoginPage'

import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './HomePage';
import { AdminLogin } from './AdminLogin';

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
  </Routes>
  </AnimatePresence>
  )
}
