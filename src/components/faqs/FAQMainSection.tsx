"use client"
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import FAQSection from './FAQSection'
import FinalCTA from '@/Ui/cta/FinalCTA'
import Footer from '@/Ui/footer/Footer'

function FAQMainSection() {
  return (
    <div className='page-bg'>
      <Navbar></Navbar>
      <FAQSection></FAQSection>
      {/* <FinalCTA></FinalCTA> */}
      <Footer></Footer>
    </div>
  )
}

export default FAQMainSection
