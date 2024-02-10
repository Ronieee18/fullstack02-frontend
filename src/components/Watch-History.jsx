import axios from 'axios'
import React,{useEffect, useState,useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import subscribe from './subscription.png'
import history from './history.png'
import videofile from './video-file.png'
import { useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


function WatchHistory() {
    const [videosArray, setVideosArray] = useState([])
    const navigate=useNavigate()
    const authStatus=useSelector((state)=>state.persistedReducer.status)
    const isMounted = useRef(true); // Add this useRef import at the beginning of your file


    const getWatchHistory=async()=>{
        const  response=await axios.get('/api/v1/users//watch-History')
        if (isMounted.current) {
            setVideosArray(response.data.data);
          }
        // console.log(response)
    }
    const addToWatchHistory=async(_id)=>{
        const response=await axios.post(`/api/v1/users/add/${_id}`)
        // console.log(response)
      }
  
      useEffect(() => {
        // Component mounted, set isMounted to true
        isMounted.current = true;
    
        // Fetch watch history
        getWatchHistory();
    
        // Cleanup function, set isMounted to false when the component is unmounted
        return () => {
          isMounted.current = false;
        };
      }, []);
  return (
    <>
    <div className='flex gap-10'>
    <div className="nav max-[660px]:hidden w-[72px]  flex flex-col gap-10 justify-start  border-r-2 border-gray-500 h-[100vh] pt-16 pr-3 pl-0">

<div className='flex flex-col cursor-pointer'
onClick={()=>{navigate('/')}}
>
  <FontAwesomeIcon icon={faHome}/>
  <p className='text-[13px]'>Home</p>
  </div>
  <div className='flex flex-col justify-center cursor-pointer'
  onClick={()=>{authStatus?navigate('/subscriptions'):navigate('/login')}}
  >
  <img src={subscribe} alt="" className='h-[40px] w-[40px] ml-2' />
  <p className='text-[10px] '>Subscriptions</p>
  </div>
  <div className='flex flex-col text-center cursor-pointer'
  onClick={()=>{authStatus?navigate('/watch-history'):navigate('/login')}}
  >
  <img src={history} alt="" className='h-[30px] w-[30px] ml-3 ' />
  <p className='text-[13px]'>Watch History</p>
  </div>
  <div className='flex flex-col text-center cursor-pointer'
  onClick={()=>{authStatus?navigate('/my-videos'):navigate('/login')}}
  >
  <img src={videofile} alt="" className='h-[30px] w-[30px] ml-3' />
  <p className='text-[13px]'>You</p>
  </div>
</div>
<div>
    <h1 className='text-left text-2xl font-bold my-5'>Watch history</h1>
    {videosArray.map((videos)=>(
      <div key={videos._id} className='flex gap-5 items-center'>
        <a href={videos.videoFile} target='_blank'>
        <video onClick={()=>{addToWatchHistory(videos._id)}} poster={videos.thumbnail} title={videos.title} src={videos.videoFile} className='h-[140px] w-[200px] hover:scale-125 transition-all duration-500 max-[460px]:w-[400px] max-[460px]:h-[200px]'
        
        ></video></a>
        <div className='flex gap-1 '>
        <img 
             
             title='View Profile'
             src={videos.owner.avatar} 
             className='h-[40px] w-[40px] rounded-full border border-black'
             alt="" />
             <div className='text-left'>
        <h4 className='font-serif w-[190px] max-[460px]:w-[400px] ' title={videos.title}>{videos.title}</h4>
        <p className='text-gray-600 cursor-pointer hover:underline' onClick={()=>{navigate(`/userchannel/${videos.owner.username}`)}}>{videos.owner.username}</p>
        </div>
        </div>
        
      </div>
    //  console.log(videos)
    ))}
    </div>
    </div>
    </>
    
  )
}

export default WatchHistory