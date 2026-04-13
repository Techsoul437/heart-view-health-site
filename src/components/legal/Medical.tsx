"use client"
import React from 'react'
import FinalCTA from '@/Ui/cta/FinalCTA'
import Navbar from '@/Ui/navbar/Navbar'
import UserConsent from './UserConsent'
function Medical() {
   return (
      <div className='page-bg'>
        <Navbar></Navbar>
        <UserConsent></UserConsent>
        <FinalCTA></FinalCTA>
      </div>
    )
}

export default Medical
