import React, { useEffect,useState } from 'react'
import { logout as storeLogout} from '../store/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import subscribe from './subscription.png'
import history from './history.png'
import videofile from './video-file.png'
import { useNavigate} from 'react-router-dom'
import './home.css'

function Home() {
  const baseurl='https://fullstack02-backend.onrender.com';
  // const baseurl="http://localhost:8000";

  const [videosArray, setVideosArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate=useNavigate()
  

  const dispatch=useDispatch();
    const authStatus=useSelector((state)=>state.persistedReducer.status)
    // console.log(authStatus)
    const logout=async()=>{
      await axios.post(`${baseurl}/api/v1/users/logout`)
        .then(()=>{
          alert('logout succesfully')
          dispatch(storeLogout())
          
        })
        .catch((error)=>{
          console.log(error)
        })
    }
    
    const addToWatchHistory=async(_id)=>{
      const response=await axios.post(`${baseurl} /api/v1/users/add/${_id}`)
      console.log(response)
    }

    const videos=async()=>{
      await axios.get(`${baseurl}/api/v1/videos/allvideos`)
        .then((response)=>{
          // console.log(response.data.data);
          setVideosArray(response.data.data);
          
        })
    }
    useEffect(()=>{
      videos();
      setIsLoading(false);
    },[])
    // useEffect(() => {
    //   const fetchVideos = async () => {
    //     setIsLoading(true);
    //     await videos();
    //     setIsLoading(false);
    //   }
    //   fetchVideos();
    // }, []);

  return (
    <>
    <div className='flex gap-10'>
    <div className="fixed  nav max-[500px]:hidden w-[72px]  flex flex-col gap-10 justify-start   border-gray-500 h-full pt-16 pr-3 pl-0">

      <div className='flex flex-col cursor-pointer'>
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
    <div className="vl max-[500px]:hidden fixed  border-l-2 border-gray-600 ml-20 h-[100vh]"></div>
    <div className={`flex  ml-24  flex-wrap gap-5  max-[500px]:ml-0  max-[460px]:justify-start`}>
    {/* <span className={`${isLoading?'open':'hidden'} loader  bg-black w-[50px] h-[50px]`}></span> */}

    {/* { authStatus && <button onClick={logout} className='p-2 bg-blue-500'>Logout</button>} */}
    {videosArray.map((videos)=>(
      <div key={videos._id} className=''>
        <a href={videos.videoFile} target='_blank'>
        <video onClick={()=>{addToWatchHistory(videos._id)}} poster={videos.thumbnail} title={videos.title} src={videos.videoFile} className='h-[150px] w-[230px] hover:scale-110 transition-all duration-500 max-[610px]:w-[400px] max-[610px]:h-[200px]'
        
        ></video></a>
        <div className='flex gap-1 '>
        <img 
             
             title='View Profile'
             src={videos.owner.avatar} 
             className='h-[40px] w-[40px] rounded-full border border-black'
             alt="" />
             <div className='text-left'>
        <h4 className='font-serif w-[190px] max-[460px]:w-[300px] ' title={videos.title}>{videos.title}</h4>
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

export default Home