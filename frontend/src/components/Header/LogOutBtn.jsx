import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import authService from '../../server/auth';
function LogOutBtn() {
  const navigate=useNavigate();

  const dispatch=useDispatch();
  const handleClick=()=>{
    authService.logout();
    dispatch(logout)
    navigate("/login")
  }

  return (
    <div>
      
      <button onClick={handleClick}>
          logout
      </button>
    
    </div>
  )
}

export default LogOutBtn
