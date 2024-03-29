import React,{useState} from 'react'
import axios from './axiosConfig'
import {useForm} from 'react-hook-form'


function UploadVideo() {
    const baseurl='https://fullstack02-backend.onrender.com';
    // const baseurl="http://localhost:8000";
    const [loading, setLoading] = useState(false);

    const {register,handleSubmit,reset,setError,formState:{errors}}=useForm()
   
    //submit handler for the form
    const uploadVideo=async(data)=>{
        setLoading(true);
        const formData=new FormData();
        formData.append("videoFile",data.videoFile[0]);
        formData.append("thumbnail", data.thumbnail[0]);
        formData.append("title", data.title);
        formData.append("description", data.description);


        try {
            await axios.post(`${baseurl}/api/v1/videos`,formData,{
                headers:{'Content-Type':'multipart/form-data'}
              })
                .then(()=>{
                    reset();
                    alert("Upload Successful");
                })
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading(false);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit(uploadVideo)}>
        <div className='flex gap-5'>
            <p>Upload video file: </p>
            <input type="file" name="" id="" 
            {...register("videoFile",{required:'this field is required'})}
            />
            </div>
        <div className='flex gap-5'>
            <p>Upload thumbnail : </p>
            <input type="file" name="" id="" 
            {...register("thumbnail",{required:'this field is required'})}
            />
        </div>
        <div className='flex gap-5'>
            <p>title for video</p>
        <input type="text"
        className='border-2 border-gray-700'
        {...register("title",{required:'this field is required'})}
        />
        </div>
        <div className='flex gap-5'>
            <p>description for ur video</p>
        <input type="text"
        className='border-2 border-gray-700'
        {...register("description",{required:'this field is required'})}
        />
        </div>
        <button type="submit" className='bg-blue-500 text-white p-2 '>{loading?'Uploading':'Upload'}</button>

        </form>
    </div>
  )
}

export default UploadVideo