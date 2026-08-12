"use client"
import React from 'react'
import HowItWorksSteps from './HowItWorksSteps'
import HowItWorksWorkflow from './HowItWorksWorkflow'
import HowItWorksTracking from './HowItWorksTracking'
import HowItWorksClearInfo from './HowItWorksClearInfo'
import HowItWorksManageMore from './HowItWorksManageMore'
import HowItWorksSecurity from './HowItWorksSecurity'
import HowItWorksFAQSection from './HowItWorksFAQSection'
import Navbar from '@/Ui/navbar/Navbar'
import Footer from '@/Ui/footer/Footer'
import Hero from './Hero'
import PremiumCTA from './PremiumCTA'

function HowItWorkMain() {
  return (
    <div className='page-bg overflow-x-hidden'>
        <Navbar></Navbar>
        <Hero></Hero>
      <HowItWorksWorkflow></HowItWorksWorkflow>
      <HowItWorksSteps></HowItWorksSteps>
      <HowItWorksTracking></HowItWorksTracking>
      <HowItWorksClearInfo></HowItWorksClearInfo>
      <HowItWorksManageMore></HowItWorksManageMore>
      <HowItWorksSecurity></HowItWorksSecurity>
      <HowItWorksFAQSection></HowItWorksFAQSection>
      <PremiumCTA></PremiumCTA>
      <Footer></Footer>
    </div>
  )
}

export default HowItWorkMain
