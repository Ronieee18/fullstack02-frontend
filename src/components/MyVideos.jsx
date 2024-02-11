import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisV,faTrash,faPencil} from '@fortawesome/free-solid-svg-icons'

function MyVideos() {
  const baseurl='https://fullstack02-backend.onrender.com';

    const [videosArray, setVideosArray] = useState([])
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuStates, setMenuStates] = useState({}); // State for each video item

    const menuRef = useRef();
    const getMenuPosition = () => {
      const videoItemRect = menuRef.current?.getBoundingClientRect();
      const rightPosition = videoItemRect ? window.innerWidth - videoItemRect.left : 40;
  
      return { right: rightPosition };
    };
  


    // const toggleMenu = () => {
    //   setIsMenuOpen(!isMenuOpen);
    // };
    const toggleMenu = (videoId) => {
      setMenuStates((prevStates) => ({
        ...prevStates,
        [videoId]: !prevStates[videoId],
      }));
    };



    // const closeMenuOnOutsideClick = (event) => {
    //   if (menuRef.current && !menuRef.current.contains(event.target)) {
    //     setIsMenuOpen(false);
    //   }
    // };
  
    // useEffect(() => {
    //   document.addEventListener('click', closeMenuOnOutsideClick);
  
    //   return () => {
    //     document.removeEventListener('click', closeMenuOnOutsideClick);
    //   };
    // }, []);




   const getvideos=async()=>{
    try {
         const response= await axios.get(`${baseurl}/api/v1/videos/myvideos`)
        // console.log(response)
        setVideosArray(response.data.data)
            
    } catch (error) {
        console.log(error.message)
    }
   }

   const deletevideo=async(videoId)=>{
    let conf=window.confirm('Are you sure to delete this video?')
    if(conf){
    try {
      const response=await axios.delete(`${baseurl}/api/v1/videos/${videoId}`)
      alert("Video deleted successfully")
      window.location.reload();
      console.log(response.data)
      alert('deleted successfully')

    } catch (error) {
      console.log(error.message)
    }
  }
   }

   useEffect(()=>{
    getvideos();
   },[])

  return (
    <>
    <div className='my-5'>
    <h1 className='text-left text-2xl font-bold mb-5'>Your Videos</h1>
    {videosArray.map((videos)=>(
        <div key={videos._id} className='flex   gap-5 mb-7 max-[900px]:flex-col max-[900px]:justify-center'>
          <a href={videos.videoFile} target='_blank'>
          <video  poster={videos.thumbnail} title={videos.title} src={videos.videoFile} className='w-[400px] max-[900px]:w-[400px] '
          
          ></video></a>
          <div className=' flex gap-1  '>
          <img 
               
               title='View Profile'
               src={videos.owner[0].avatar} 
               className='h-[40px] w-[40px] rounded-full border border-black'
               alt="" />
               <div className='text-left'>
          <h4 className='font-serif w-[190px] max-[460px]:w-[400px] ' title={videos.title}>{videos.title}</h4>
          <p className='text-gray-600'>{videos.owner[0].username}</p>
          </div>
          <FontAwesomeIcon icon={faEllipsisV}
          onClick={()=>{toggleMenu(videos._id)}}
          className='absolute right-20 h-[30px]'
          ref={menuRef}    
          />
          {menuStates[videos._id] && (
        <div className="flex   absolute mt-2 w-40 bg-white border rounded-md shadow-lg" style={getMenuPosition()}>
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:underline cursor-pointer">
            <FontAwesomeIcon icon={faPencil} className='mr-3 hover:underline'/>
              Edit Details
            </div>
            <div className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:underline cursor-pointer"
            onClick={()=>{deletevideo(videos._id)}}
            >
              <FontAwesomeIcon icon={faTrash} className='mr-3'/>
               Delete Video
            </div>
            
          </div>
        </div>
      )}
          </div>
          
        </div>
      //  console.log(videos)
      ))}</div>
      </>
  )
}

export default MyVideos