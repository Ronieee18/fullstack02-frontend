import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars,faHome} from '@fortawesome/free-solid-svg-icons'
import './header.css'
import mytube from './mytube.png'
import { useSelector } from 'react-redux'
import user from './user.png'
import video from './video.png'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import subscribe from './subscription.png'
import history from './history.png'
import axios from 'axios'
import { logout as storeLogout} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import { useState,useEffect } from 'react'
import videofile from './video-file.png'




function Header() {
  const baseurl='https://fullstack02-backend.onrender.com';
  // const baseurl="http://localhost:8000";


  const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [avatar,setAvatar]=useState("");
    const [email,setEmail]=useState("");
    const [coverImage,setCoverImage]=useState("");
   useEffect(()=>{
    const fetchUser=async()=>{
        try {
            const response=await axios.get(`${baseurl}/api/v1/users/current-user`,{
                withCredentials:true,
            })
            setName(response.data.data.fullName)
            setUsername(response.data.data.username)
            setCoverImage(response.data.data.coverImage)
            setEmail(response.data.data.email)
            setAvatar(response.data.data.avatar)
            

            
          
        //    console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    fetchUser();
   },[])



  const dispatch=useDispatch();
  const logout=async()=>{
    await axios.post(`${baseurl}/api/v1/users/logout`)
      .then(()=>{
        alert('logout succesfully')
        dispatch(storeLogout())
        
        navigate('/')

        
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  const authStatus=useSelector((state)=>state.persistedReducer.status)
  const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={`flex flex-col px-3 gap-y-6 shadow-xl  z-10 bg-white h-full w-[200px] sidebar ${isOpen ? 'open' : 'hidden'} absolute top-20 transition-all duration-500 delay-100 ease-in-out   `}>
      
      {/* Add your sidebar content here */}
      <div className='flex gap-5 cursor-pointer'
      onClick={()=>{navigate('/');handleToggleSidebar()}}
      >
        <FontAwesomeIcon icon={faHome} className='h-[20px] '/>
        <p className=''>Home</p>
        </div>

        <div className='flex gap-2 cursor-pointer '
        onClick={()=>{navigate('/subscriptions');handleToggleSidebar()}}
        >

        <img src={subscribe} alt="" className='h-[35px] w-[35px] ' />
        <p className=''>Subscriptions</p>
        </div>

        <div className='flex  text-center gap-2 cursor-pointer'
        onClick={()=>{navigate('/watch-history');handleToggleSidebar()}}
        >
        <img src={history} alt="" className='h-[30px] w-[30px] ' />
        <p className=''>Watch History</p>
        </div>
        <div className='flex  gap-2  cursor-pointer'
        onClick={()=>{authStatus?navigate('/my-videos'):navigate('/login');handleToggleSidebar()}}
        >
        <img src={videofile} alt="" className='h-[30px] w-[30px] ' />
        <p className=''>You</p>
        </div>

        { authStatus && <button onClick={logout} className='p-2  border border-black'>Logout</button>}
    </div>



    <div className='flex w-[full] justify-between  p-1 border-b-2 border-gray-300 shadow-sm shadow-gray-500'>
        <div className='flex gap-4 '>  
            <FontAwesomeIcon icon={faBars}
             onClick={handleToggleSidebar}
            className='h-[34px] w-[40px]'/>
            <div className="logo flex justify-center mt-1 ">
          <img src={mytube} alt="mytube" className='h-[40px] w-[40px]' />
          <p className="text  mt-1">MYTUBE</p>
          </div>

        </div>

        <div className='flex gap-6 '>
            {authStatus && <div className="videoicon">
              <img src={video} title='upload video' alt="video" className='h-[40px] cursor-pointer'
               onClick={()=>{navigate('/upload-video')}} 
              />
            </div>}
            {!authStatus &&
            <button
            onClick={()=>{navigate('/login')}}
            className='p-2 w-[150px] max-[600px]:w-[100px] font-mono text-2xl border border-black'>Login</button>
            }
            <img 
            onClick={()=>{authStatus?navigate(`/userchannel/${username}`):navigate('/login')}} 
            title='View Profile'
            src={authStatus?avatar:user} 
            className='h-[40px] w-[40px] rounded-full border-2 border-black'
            alt="" />

        </div>
  
    </div>

    {/* <Sidebar/> */}
    
    </>
  )
  
}
 
export default Header
