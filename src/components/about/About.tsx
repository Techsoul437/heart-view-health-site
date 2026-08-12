"use client";
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import WhatDo from './WhatDo'
import ReportUnderstand from './ReportUnderstand';
import OurApproach from './OurApproach';
import CorePrinciples from './CorePrinciples';
import OurVision from './OurVision';
import CompanySection from './CompanySection';
import Footer from '@/Ui/footer/Footer';
import Hero from './Hero';
import WhyBuilt from './WhyBuilt';
import SecurityPrivacy from './SecurityPrivacy';
import PremiumCTA from './PremiumCTA';
import TeamSection from './TeamSection';
import OurMission from './Our Mission';
import WhyHeartView from '../home/WhyHeartView';
import WhyHeartview from './WhyHeartview';

function About() {
  return (
    <div className='page-bg'>
      <Navbar></Navbar>
      <OurMission></OurMission>

      {/* <Hero></Hero> */}
      <WhyHeartview></WhyHeartview>
      {/* <WhatDo></WhatDo> */}
      {/* <ReportUnderstand></ReportUnderstand> */}
      <OurApproach></OurApproach>
      <CorePrinciples></CorePrinciples>
      {/* <WhyBuilt></WhyBuilt> */}
      <OurVision></OurVision>
      <TeamSection></TeamSection>
      <SecurityPrivacy></SecurityPrivacy>
      {/* <CompanySection></CompanySection> */}
      {/* <FinalCTA></FinalCTA> */}
      <PremiumCTA></PremiumCTA>
      <Footer></Footer>
    </div>
  )
}

export default About
