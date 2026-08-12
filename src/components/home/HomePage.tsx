"use client";

import React from 'react';
import Hero from './Hero';
import Navbar from '@/Ui/navbar/Navbar';
import Footer from '@/Ui/footer/Footer';
import AppDownloadSection from './AppDownloadSection';
import BlogSection from './BlogSection';
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
        
        <Problem></Problem>
        
        <KeyFeatures></KeyFeatures>
        
        <LabReportsSection></LabReportsSection>
        
        <WhoItsFor></WhoItsFor>
        
        <HealthGuidesSection></HealthGuidesSection>

        <div className='pt-14'>
          <Image
            src="https://heartview-images.s3.ap-south-1.amazonaws.com/phone-with-shadow.jpg"
            alt="Phone Mockup"
            width={1960}
            height={900}
            className="w-full h-auto"
          />
        </div>

        <BlogSection></BlogSection>
        
        <FAQSection></FAQSection>
        
        <AppDownloadSection></AppDownloadSection>
        
        <Footer></Footer>
      </div>
    </>
  )
}

export default HomePage;
