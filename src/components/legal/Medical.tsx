"use client"
import React from 'react'
import FinalCTA from '@/Ui/cta/FinalCTA'
import Navbar from '@/Ui/navbar/Navbar'
import UserConsent from './UserConsent'
import Footer from '@/Ui/footer/Footer'
function Medical() {
   return (
      <div className='page-bg'>
        <Navbar></Navbar>
        <UserConsent></UserConsent>
        {/* <FinalCTA></FinalCTA> */}
        <Footer></Footer>
      </div>
    )
}

export default Medical
