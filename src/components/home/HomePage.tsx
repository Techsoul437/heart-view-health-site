"use client";

import React from 'react';
import Hero from './Hero';
import Navbar from '@/Ui/navbar/Navbar';
import WhatIsHeartView from './WhatIsHeartView';
import Footer from '@/Ui/footer/Footer';
import AppDownloadSection from './AppDownloadSection';
import BlogSection from './BlogSection';
import TrustPrivacySection from './TrustPrivacySection';
import Problem from './Problem';
import KeyFeatures from './KeyFeatures';
import LabReportsSection from './LabReportsSection';
import HealthGuidesSection from './HealthGuidesSection';
import FAQSection from './FAQSection';
import WhoItsFor from './WhoItsFor';
import Image from 'next/image';

function HomePage() {
  return (
    <>
      <div className='page-bg'>
        <Navbar></Navbar>
        
        <Hero></Hero>
        
        <WhatIsHeartView></WhatIsHeartView>

        <Problem></Problem>
        
        <KeyFeatures></KeyFeatures>
        
        <LabReportsSection></LabReportsSection>
        
        <WhoItsFor></WhoItsFor>
        
        <HealthGuidesSection></HealthGuidesSection>


        <BlogSection></BlogSection>

        <TrustPrivacySection></TrustPrivacySection>
        
        <FAQSection></FAQSection>
        
        <div className='pt-14'>
          <Image
            src="/PhoneFrame.jpg"
            alt="Phone Mockup"
            width={1960}
            height={1200}
            className="w-full h-auto"
          />
        </div>
        <AppDownloadSection></AppDownloadSection>
        
        <Footer></Footer>
      </div>
    </>
  )
}

export default HomePage;
