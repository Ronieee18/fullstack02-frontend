import React,{useEffect, useState} from 'react'
import axios from 'axios'

function Subscribed_videos() {
  const baseurl='https://fullstack02-backend.onrender.com';
  // const baseurl="http://localhost:8000";

    const [videosArray, setVideosArray] = useState([])
    const videos=async()=>{
        const response=await axios.get(`${baseurl}/api/v1/videos/subscribed`)
        const arr=response.data.data;
        const videos=arr.map((obj)=>(obj.videos.map((obj)=>(obj))))
        setVideosArray(videos);
        // console.log(videos)
            
          
      }
      useEffect(()=>{
        videos();
      },[])
  return (
    <>
    
    <div className='flex flex-wrap ml-5 max-[600px]:ml-0'>
    {
        videosArray.map((videos)=>(
            videos.map((video)=>(
                <div key={video._id} className=''>
                <a href={video.videoFile} target='_blank'>
                <video  poster={video.thumbnail} title={video.title} src={video.videoFile} className='h-[140px] w-[200px] hover:scale-125 transition-all duration-500  max-[460px]:w-[400px] max-[460px]:h-[200px]'
                
                ></video></a>
                <div className='flex gap-1 '>
                <img 
                     
                     title='View Profile'
                    src={video.owner[0].avatar} 
                     className='h-[40px] w-[40px] rounded-full border border-black'
                     alt="" />
                     <div className='text-left'>
                <h4 className='font-serif w-[190px] max-[460px]:w-[400px] ' title={video.title}>{video.title}</h4>
                <p className='text-gray-600 cursor-pointer hover:underline' onClick={()=>{navigate(`/userchannel/${video.owner[0].username}`)}}>{video.owner[0].username}</p>
                </div>
                </div>
                
              </div>
              
            ))
        ))
    }</div>
    {/* {videosArray.map((videos)=>(
      <div key={videos._id} className=''>
        <a href={videos.videoFile} target='_blank'>
        <video  poster={videos.thumbnail} title={videos.title} src={videos.videoFile} className='h-[140px] w-[200px]  max-[460px]:w-[400px] max-[460px]:h-[200px]'
        
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
     ))}  */}
    </>
  )
}

export default Subscribed_videos