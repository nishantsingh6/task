import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './components/common/Login'
import SignUp from './components/common/SignUp'
import ForgotPassword from './components/common/ForgotPassword'
import ResetPassword from './components/common/ResetPassword'
import DashBoard from './components/userComponents/DashBoard'
import PublicNav from './components/navBars/PublicNav'

const App = () => {
  return (
    <div>

    <Routes>

      <Route path={"/"} element={<PublicNav>
          <SignUp/>
        </PublicNav>}></Route> 
        <Route path={"/login"} element={<PublicNav>
          <Login/>
        </PublicNav>}></Route>
        <Route path={"/signup"} element={<PublicNav>
          <SignUp/>
        </PublicNav>}></Route>


      <Route path="/forgot-password" element={<PublicNav><ForgotPassword /></PublicNav>} />
      <Route path="/reset-password" element={<PublicNav><ResetPassword /></PublicNav>} />

      
      <Route path="/dashboard" element={<DashBoard/>} />



    </Routes>
    </div>
  )
}

export default App