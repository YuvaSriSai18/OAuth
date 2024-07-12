import React from 'react'
import './dashboard.css'
export default function Dashboard({userData}) {
  return (
    <div className='main-container'>
      <img src={userData.photoUrl} alt="" className='image' />
      <div className='row-container'>
        <label> Display Name</label> <input type="text" readOnly value={userData.displayName} />
      </div>

      <div className='row-container'>
        <label> Roll No</label> <input type="text" readOnly value={userData.rollNo} />
      </div>

      <div className='row-container'>
        <label> First Name</label> <input type="text" readOnly value={userData.firstName} />
      </div>

      <div className='row-container'>
        <label> Last Name</label> <input type="text" readOnly value={userData.lastName} />
      </div>

      <div className='row-container'>
        <label> Role</label> <input type="text" readOnly value={userData.role} />
      </div>

      <div className='row-container'>
        <label>Email</label> <input type="text" readOnly value={userData.email} />
      </div>
    </div>
  )
}
