"use client"
import FinalCTA from '@/Ui/cta/FinalCTA'
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import Contact from './Contact'

function Contactmain() {
  return (
    <div className='page-bg'>
      <Navbar />
      <Contact></Contact>
      <FinalCTA></FinalCTA>
    </div>
  )
}

export default Contactmain
