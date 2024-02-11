import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell,faBellConcierge, faL} from '@fortawesome/free-solid-svg-icons'

 function UserChannel() {
    const baseurl='https://fullstack02-backend.onrender.com';

    const [isSubscribed,setIsSubscribed]=useState(false)
    const [subscribers,setSubscribers]=useState(0)
      const {username}=useParams();
      const [name,setName]=useState("");
      const [avatar,setAvatar]=useState("");
      const [email,setEmail]=useState("");
      const [coverImage,setCoverImage]=useState("");

    //   console.log(username)


    const  getUserChannel=async()=>{
        try {
            const response= await axios.get(`${baseurl}/api/v1/users/c/${username}`)
            console.log(response.data)
            setName(response.data.data.fullName)
            setIsSubscribed(response.data.data.isSubscribed)
            setSubscribers(response.data.data.subscribersCount)
            setCoverImage(response.data.data.coverImage)
            setEmail(response.data.data.email)
            setAvatar(response.data.data.avatar)
        } 
       catch (error) {
            console.log(error.message)
        } 
    }

    const Subscribe=async()=>{
        try {
            const response=await axios.post(`${baseurl}/api/v1/subscribe/${username}`)
                .then(()=>{alert('Subscribed')})
                window.location.reload();
                // setIsSubscribed(!isSubscribed)
            // console.log(response)
            console.log(response)
            // setIsSubscribed(response.data.isSubscribed)
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(()=>{
        getUserChannel();
    },[])
  return (
    <>
    <div className=''>
        {/* coverImage & avtar */}  
        <img src={coverImage} alt="" className='relative h-[270px] w-full opacity-80' />
        <img src={avatar} alt="" 
    className='absolute  top-[270px] left-32 h-[120px] w-[120px] border-8 border-b-0  border-gray-700 rounded-full' />
    <div className="absolute  top-[290px] w-[22%] text-white rounded-lg font-sans text-xl left-60 p-2 bg-gray-700">
        <p>{name}</p>
        <p>{username}</p>
    </div>
    </div>
    
    <br />
    <div className='flex justify-between  max-[600px]:flex-col mt-10'>
        <div className='text-left  ml-10 font-mono'>
    <p>Email: {email}</p>
    <p>{subscribers} subscribers</p>
    </div>
    <div className=' mr-10'>
    
    <button
    onClick={Subscribe}
    className={`${isSubscribed?'bg-gray-600':'bg-red-500'} hover:bg-red-600 mr-5   p-2 text-white`}>{isSubscribed?'Subscribed':'Subscribe'}</button>
    
    <FontAwesomeIcon icon={faBell}/>
    </div>
    </div>

    </>
    
  )
}

export default UserChannel