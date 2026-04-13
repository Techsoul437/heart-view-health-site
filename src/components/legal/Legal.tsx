"use client"
import React from 'react'
import Privacy from './Privacy'
import Navbar from '@/Ui/navbar/Navbar'
import FinalCTA from '@/Ui/cta/FinalCTA'

function Legal() {
  return (
    <div className='page-bg'>
        <Navbar></Navbar>
      <Privacy></Privacy>
      <FinalCTA></FinalCTA>
    </div>
  )
}

export default Legal
