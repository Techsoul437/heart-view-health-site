"use client"
import React from 'react'
import HowItWorks from './HowItWorks'
import Navbar from '@/Ui/navbar/Navbar'
import Footer from '@/Ui/footer/Footer'

function HowItWorkMain() {
  return (
    <div className='page-bg'>
        <Navbar></Navbar>
      <HowItWorks></HowItWorks>
      <Footer></Footer>
    </div>
  )
}

export default HowItWorkMain
