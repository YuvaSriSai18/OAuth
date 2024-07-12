import React from 'react'
import { useState, useEffect} from 'react'
import { Routes,Route } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Error from './components/Error'
import axios from 'axios'
import Headers from './components/Headers'
const App = () => {

  const [userData,setUserData] = useState({})
    const getUser = async () =>{
        try {
            const response = await axios.get('http://localhost:5500/login/success',{withCredentials:true})
            console.log('res',response)
            setUserData(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser()
    },[])
  return (
    <div>
        <Headers/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard userData={userData}/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
    </div>
  )
}

export default App
