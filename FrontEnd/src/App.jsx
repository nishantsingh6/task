import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './components/common/Login'
import SignUp from './components/common/SignUp'
import ForgotPassword from './components/common/ForgotPassword'
import ResetPassword from './components/common/ResetPassword'

const App = () => {
  return (
    <div className='text-center'>App
  

    <Routes>

      <Route path="/" element={<SignUp/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />



    </Routes>
    </div>
  )
}

export default App