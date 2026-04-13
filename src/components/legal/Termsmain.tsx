"use client"
import FinalCTA from '@/Ui/cta/FinalCTA'
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import TermsCondion from './TermsCondion'

function Termsmain() {
  return (
    <div className='page-bg'>
      <Navbar></Navbar>
      <TermsCondion></TermsCondion>
      <FinalCTA></FinalCTA>
    </div>
  )
}

export default Termsmain
