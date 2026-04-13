"use client"
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import FAQSection from './FAQSection'
import FinalCTA from '@/Ui/cta/FinalCTA'

function FAQMainSection() {
  return (
    <div className='page-bg'>
      <Navbar></Navbar>
      <FAQSection></FAQSection>
      <FinalCTA></FinalCTA>
    </div>
  )
}

export default FAQMainSection
