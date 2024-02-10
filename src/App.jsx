import { useState } from 'react'
import './App.css'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faEnvelope,faLock,faEye,} from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'


// import { login } from '../../backend/src/controllers/user.controller.js' 

function App() {
  


  return (
    <>
    <Header/> 
    <Outlet/>
    </>
  )
}

export default App
