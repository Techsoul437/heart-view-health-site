"use client";

import React from 'react'
import Hero from './Hero'
import Navbar from '@/Ui/navbar/Navbar';
import Footer from '@/Ui/footer/Footer';
import QuickValueSection from './QuickValueSection';
import HowItWorks from '../how_work/HowItWorks';
import FinalCTA from '@/Ui/cta/FinalCTA';
import AppDownloadSection from './AppDownloadSection';
import BlogSection from './BlogSection';
import TeamSection from './TeamSection';
import Problem from './Problem';
import LifestyleSection from './LifestyleSection';
import TrustSection from './TrustSection';
import CoreFeatures from './CoreFeatures';
import WhatIsHeartView from './WhatIsHeartView';
import WhyHeartView from './WhyHeartView';
import WhoItsFor from './WhoItsFor';
import Image from 'next/image';


function HomePage() {
  return (
    <>
      <div className='page-bg'>
        <Navbar></Navbar>
        <Hero></Hero>
        <Problem></Problem>
        <WhatIsHeartView></WhatIsHeartView>
        {/* <LifestyleSection></LifestyleSection> */}
        {/* <CoreFeatures></CoreFeatures> */}
        {/* <TrustSection></TrustSection> */}

        <div className='pt-14'>
        <Image
          src="https://heartview-images.s3.ap-south-1.amazonaws.com/phone-with-shadow.jpg"
          alt="Phone Mockup"
          width={1960}
          height={900}
          className="w-full h-auto"
        />
        </div>
        <WhyHeartView></WhyHeartView>


        <BlogSection></BlogSection>
        {/* <WhoItsFor></WhoItsFor> */}
        <AppDownloadSection></AppDownloadSection>
        <Footer></Footer>

        {/* <QuickValueSection></QuickValueSection> */}
        {/* <HowItWorks></HowItWorks> */}
        {/* <TeamSection></TeamSection> */}
        {/* <FAQSection></FAQSection> */}
        {/* <FinalCTA></FinalCTA> */}

      </div>

    </>
  )
}

export default HomePage
