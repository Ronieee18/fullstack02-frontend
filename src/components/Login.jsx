import { useState } from 'react'
import Cookies from 'js-cookie'
import mytube from './mytube.png'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import './login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faEnvelope,faLock,faEye} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { login as storeLogin} from '../store/authSlice'


function Login() {
    const [pass,showPass]=useState(true)
    const {register,handleSubmit,setError,formState:{errors}}=useForm()
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const  onSubmit=async(data)=>{
    try {
        axios.post('/api/v1/users/login',data)
            .then(async(response)=>{
              dispatch(storeLogin(response))
              
              
              // const responseData=await response.json();
              // document.cookie=`accessToken=${response.data.accessToken}`;
              Cookies.set('accessToken',response.data.accessToken)
              console.log(response);
              alert("login succesfully");
              navigate('/')

            })
            .catch((error)=>{
              console.log(error)
            })
            
       

    } catch (error) {
      alert(`error: ${error}`)
    }
  }
  return (
    <div className=' flex justify-center login min-h-screen '>
      <div className='m-2 '>
      <form onSubmit={handleSubmit(onSubmit)} method='POST'>
        <div className='flex bg-white flex-col gap-y-9 w-80  p-3 mt-10 rounded-lg  '>
          <div className="logo flex justify-center mt-4">
          <img src={mytube} alt="mytube" className='h-[30px] w-[30px]' />
          <p className="text mt-1">MYTUBE</p>
          </div>
          <p className="loginText">LOGIN</p>
          <div className="email relative">
          <FontAwesomeIcon icon={faEnvelope}/>

      <input type="email" name='email' placeholder='Type your email' 
      className='border-b border-gray-600 focus:outline-none p-2 placeholder:font-serif placeholder:text-sm'
      {...register("email",{required:"this field is required"})} 
      
      />
      </div>
      <div className="username relative">
        <FontAwesomeIcon icon={faUser}/>
      <input type="text" name='username' placeholder='Type your username'   
      className='border-b border-gray-600 focus:outline-none p-2 placeholder:font-serif placeholder:text-sm'
      {...register("username",{required:"this field is required"})}  
      /></div>
      <div className="password relative">
      <FontAwesomeIcon icon={faLock}/>
      <input  type={`${pass?'password':'text'}`} name='password' placeholder='Type your password' autoComplete='off' 
      className='border-b border-gray-600 p-2 focus:outline-none placeholder:font-serif placeholder:text-sm'
      {...register("password",{required:"this field is required"})}  
      />
      <FontAwesomeIcon icon={faEye} className={`absolute right-10 bottom-2.5 cursor-pointer`}
      onClick={()=>showPass((prev)=>!prev)}
      />
      </div>

      <button type='submit' className='hover:underline text-xl p-1 text-white'>Login</button>
        
    <div className="signup flex flex-col ">
      <p>Or signup using</p>
      <p onClick={()=>navigate('/signup')} className='hover:underline cursor-pointer'>SignUp</p>
    </div>

      </div>
      </form> 
      </div>
    </div>
  )
}

export default Login