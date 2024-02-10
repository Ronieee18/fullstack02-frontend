// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faBell,faBellConcierge} from '@fortawesome/free-solid-svg-icons'

// function Profile() {
//     // const { myusername } = useParams();
//     const [name,setName]=useState("");
//     const [username,setUsername]=useState("");
//     const [avatar,setAvatar]=useState("");
//     const [email,setEmail]=useState("");
//     const [coverImage,setCoverImage]=useState("");
//     const [subscribers,setSubscribers]=useState(0);
  
//     const fetchUser=async()=>{
//         try {
//             const response=await axios.get('/api/v1/users/current-user',{
//                 withCredentials:true,
//             })
//             setName(response.data.data.fullName)
//             setUsername(response.data.data.username)
//             setCoverImage(response.data.data.coverImage)
//             setEmail(response.data.data.email)
//             setAvatar(response.data.data.avatar)
            

            
          
//         //    console.log(response) 
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const  getUserChannel=async()=>{
//         try {
//             const response= await axios.get(`/api/v1/users/c/${username}`)
//             console.log(response.data)
            
//         } 
//        catch (error) {
//             console.log(error.message)
//         }
//     }

                  
//     useEffect(()=>{ 
//         fetchUser();
//         // getUserChannel();
//    },[])
//   return (
//     <>
//     <div className=''>
//         {/* coverImage & avtar */}  
//         <img src={coverImage} alt="" className='relative h-[270px] w-full opacity-80' />
//         <img src={avatar} alt="" 
//     className='absolute  top-[270px] left-32 h-[120px] w-[120px] border-8 border-b-0  border-gray-700 rounded-full' />
//     <div className="absolute  top-[290px] w-[22%] text-white rounded-lg font-sans text-xl left-60 p-2 bg-gray-700">
//         <p>{name}</p>
//         <p>{username}</p>
//     </div>
//     </div>
    
//     <br />
//     <div className='flex justify-between  mt-10'>
//     <p className='text-left  ml-10 font-mono'>Email: {email}</p>
//     <div className=' mr-10'>
//     <button className='bg-red-500 hover:bg-red-600 mr-5   p-2 text-white'>Subscribe</button>
//     <FontAwesomeIcon icon={faBell}/>
//     </div>
//     </div>
    
// </>
//   )
// }

// export default Profile