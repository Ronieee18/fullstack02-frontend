import React from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './signup.css'
import mytube from './mytube.png'
import {faUser,faEnvelope,faLock,faEye,} from '@fortawesome/free-solid-svg-icons'


function Signup() {
  const baseurl='https://fullstack02-backend.onrender.com';

    const {register,handleSubmit,setError,formState:{errors}}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const onSubmit=async(data)=>{
      try {
        const formData=new FormData();
        formData.append("fullName", data.fullName);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("avatar", data.avatar[0]);
        formData.append("coverImage", data.coverImage[0]);

        await axios.post(`${baseurl}/api/v1/users/register`,formData,{
          headers:{'Content-Type':'multipart/form-data'}
        })
            .then(async(response)=>{
              // const responseData=await response.json();
              console.log(response);
              alert("signup succesfully");
              navigate('/login')

            })
            .catch((error)=>{
              console.log(error)
            })
            
       

    } catch (error) {
      alert(`error: ${error}`)
    }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} method='POST'>
    <div className='relative  flex justify-stretch  gap-x-36 items-center  ' style={{height: '100vh'}}>
        <div className='abc flex flex-col w-[500px] gap-y-6 h-full justify-center max-h-full items-center max-[800px]:hidden'>
          
            <h1 className='text-6xl text-white font-serif  '>Welcome to <br /> Mytube </h1>
            <p className='text-white text-base w-[200px]'>An entertainment platform where anyone can watch and upload videos</p>
            <p className='text-white text-sm absolute bottom-1 left-2 hover:underline'>Copyright © 2010-2024</p>
        </div>
        <div className='  m-auto ' style={{height: '100vh'}}>
        <div className='  relative ' style={{height: '100vh'}}>
        <div className="logo flex justify-center mt-4">
          <img src={mytube} alt="mytube" className='h-[40px] w-[45px]' />
          <p className="text mt-2">MYTUBE</p>
          </div>
            <h2 className='my-3 font-serif text-xl font-medium'>Sign up</h2>
            <div className='flex gap-x-10 '>
                <div className='relative'>
                <FontAwesomeIcon icon={faUser}/>
            <input type="text" name='username' placeholder='Enter your FullName'   
      className='border-b border-gray-600 max-[550px]:w-28 focus:outline-none p-2 placeholder:font-serif placeholder:text-sm'
      {...register("fullName",{required:"this field is required"})}
      />
      </div>
      <div>
      <FontAwesomeIcon icon={faUser}/>
           <input type="text" name='username' placeholder='Create your username'   
      className='border-b max-[550px]:w-28 border-gray-600 focus:outline-none p-2 placeholder:font-serif placeholder:text-sm'
      {...register("username",{required:"this field is required"})}
      />
      </div>

      </div>
      <div className='flex mt-6 '>
      <FontAwesomeIcon icon={faEnvelope} className='mt-4 '/>

<input type="email" name='email' placeholder='    Type your email' 
className='border-b border-gray-600 focus:outline-none p-2 placeholder:font-serif placeholder:text-sm  w-full'
{...register("email",{required:"this field is required"})}
/>
</div>
    <div className='mt-7 '>
      Cover Image: 
      <input type="file" className='m-1'
      {...register("coverImage",{required:"this field is required"})}
      />
      </div>
    <div className='mt-7 '>
      Avatar: 
      <input type="file" className='m-1'
      {...register("avatar",{required:"this field is required"})}
      />
      </div>
      <div className='relative'>
      <FontAwesomeIcon icon={faLock} className=' '/>

<input type="password" name='password' placeholder='   Create a password' 
className='border-b border-gray-600 focus:outline-none p-2 placeholder:font-serif placeholder:text-sm mt-4 '
{...register("password",{required:"this field is required"})}
/>
</div>

      <button type='submit' className=' w-full hover:underline text-xl p-1 py-2 text-white my-12'>Signup</button>
      

        </div>
        </div>
    </div>
    </form>
  )
}

export default Signup