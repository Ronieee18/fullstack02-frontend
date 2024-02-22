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
  const baseurl='https://fullstack02-backend.onrender.com';
  // const baseurl="http://localhost:8000";

    const [pass,showPass]=useState(true)
    const {register,handleSubmit,setError,formState:{errors}}=useForm()
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const  onSubmit=async(data)=>{
    const {email,username,password}=data;
    if(!email||!password||!username){
      alert('all field are required')
      return;
    }
    try {
        axios.post(`${baseurl}/api/v1/users/login`,data)
            .then(async(response)=>{
              dispatch(storeLogin(response))
              
              
              // const responseData=await response.json();
              // document.cookie=`accessToken=${response.data.accessToken}`;
              Cookies.set('accessToken',response.data.data.accessToken)
              console.log(response);
              alert("login succesfully");
              navigate('/')

            })
            .catch((error)=>{
              if(error.response && error.response.data){
                const errorHTML=error.response.data;
                console.log(errorHTML)
                const parser=new DOMParser();
                const doc=parser.parseFromString(errorHTML,'text/html')
                const errormsg=doc.querySelector('pre').textContent;
                
                if(errormsg.includes('Invalid credentials')){
                  alert("invalid password");
                }
                else if(errormsg.includes('user not found')){
                  alert("User not found: Invalid username or email");
                }
              }
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
      className='relative border-b border-gray-600 focus:outline-none p-2 placeholder:font-serif placeholder:text-sm'
      {...register("email",{required:"Email is required"})} 
      
      
      />
      {errors.email && <p className="error absolute left-12 text-red-500">*{errors.email.message}</p>}
           
      </div>
      <div className="username relative">
        <FontAwesomeIcon icon={faUser}/>
      <input type="text" name='username' placeholder='Type your username'   
      className='border-b border-gray-600 focus:outline-none p-2 placeholder:font-serif placeholder:text-sm'
      {...register("username",{required:"Username is required"})}  

      />
      {errors.username && <p className="error absolute left-12 text-red-500">*{errors.username.message}</p>}
      </div>
      <div className="password relative">
      <FontAwesomeIcon icon={faLock}/>
      <input  type={`${pass?'password':'text'}`} name='password' placeholder='Type your password' autoComplete='off' 
      className='border-b border-gray-600 p-2 focus:outline-none placeholder:font-serif placeholder:text-sm'
      {...register("password",{required:"Password is required"})}  
      />
      {errors.password && <p className="error absolute left-12 text-red-500">*{errors.password.message}</p>}
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