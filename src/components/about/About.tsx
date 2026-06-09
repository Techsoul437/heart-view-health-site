"use client";
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import WhatDo from './WhatDo'
import ReportUnderstand from './ReportUnderstand';
import OurApproach from './OurApproach';
import OurVision from './OurVision';
import CompanySection from './CompanySection';
import Footer from '@/Ui/footer/Footer';
import Hero from './Hero';
import WhyBuilt from './WhyBuilt';
import SecurityPrivacy from './SecurityPrivacy';
import PremiumCTA from './PremiumCTA';

function About() {
  return (
    <div className='page-bg'>
      <Navbar></Navbar>
      <Hero></Hero>
      <WhatDo></WhatDo>
      <ReportUnderstand></ReportUnderstand>
      <OurApproach></OurApproach>
      <WhyBuilt></WhyBuilt>
      <OurVision></OurVision>
      <SecurityPrivacy></SecurityPrivacy>
      <CompanySection></CompanySection>
      {/* <FinalCTA></FinalCTA> */}
      <PremiumCTA></PremiumCTA>
      <Footer></Footer>
    </div>
  )
}

export default About
