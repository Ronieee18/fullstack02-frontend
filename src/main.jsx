import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.js'
import {persistor} from './store/store.js' 
import { PersistGate } from 'redux-persist/integration/react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Signup from './components/Signup.jsx' 
import Login from './components/Login.jsx' 
// import Profile from './components/Profile.jsx'
import Home from './components/Home.jsx'
import Authlayout from './components/Authlayout.jsx'
import UploadVideo from './components/UploadVideo.jsx'
import MyVideos from './components/MyVideos.jsx'
import UserChannel from './components/UserChannel.jsx'
import Subscribed_videos from './components/Subscribed_videos.jsx'
import WatchHistory from './components/Watch-History.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/upload-video',
        element:<UploadVideo/>
      },
      {
        path:'/watch-history',
        element:<WatchHistory/>
      },
      {
        path:'/subscriptions',
        element:<Subscribed_videos/>
      },
      {
        path:'/my-videos',
        element:<MyVideos/>
      },
      // {
        
      //   path:'/profile',
      //   element:
      //   // <Authlayout authentication>
      //   <Profile/>
      //   // </Authlayout>
      // },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:`/userchannel/:username`,
        element:<UserChannel/>
      },
      {
        path:'/login',
        element:<Login/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>   
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
 
  </React.StrictMode>,
)
