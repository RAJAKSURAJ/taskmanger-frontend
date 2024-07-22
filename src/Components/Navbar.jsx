import Button from 'react-bootstrap/Button';
import React from 'react'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout=()=>{
    navigate("/login")
  }
  return (
    <div className='d-flex justify-content-between p-4'>
        <h1>Task Management</h1>
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    </div>
  )
}

export default Navbar