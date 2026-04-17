"use client"
import React from 'react'
import Privacy from './Privacy'
import Navbar from '@/Ui/navbar/Navbar'
import FinalCTA from '@/Ui/cta/FinalCTA'
import Footer from '@/Ui/footer/Footer'

function Legal() {
  return (
    <div className='page-bg'>
        <Navbar></Navbar>
      <Privacy></Privacy>
      {/* <FinalCTA></FinalCTA> */}
      <Footer></Footer>
    </div>
  )
}

export default Legal
