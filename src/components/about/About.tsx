"use client";
import FinalCTA from '@/Ui/cta/FinalCTA'
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import Hero from './Hero'
import WhatDo from './WhatDo'
import ReportUnderstand from './ReportUnderstand';
import OurApproach from './OurApproach';
import WhyBuilt from './WhyBuilt';
import OurVision from './OurVision';
import CompanySection from './CompanySection';
import Footer from '@/Ui/footer/Footer';

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
<CompanySection></CompanySection>
      {/* <FinalCTA></FinalCTA> */}
      <Footer></Footer>
    </div>
  )
}

export default About
