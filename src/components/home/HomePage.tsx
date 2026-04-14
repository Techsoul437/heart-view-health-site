"use client";

import React from 'react'
import Hero from './Hero'
import Navbar from '@/Ui/navbar/Navbar';
import Footer from '@/Ui/footer/Footer';
import QuickValueSection from './QuickValueSection';
import HowItWorks from './HowItWorks';
import FinalCTA from '@/Ui/cta/FinalCTA';
import AppDownloadSection from './AppDownloadSection';
import BlogSection from './BlogSection';
import TeamSection from './TeamSection';


function HomePage() {
  return (
    <>
      <div className='page-bg'>
        <Navbar></Navbar>
        <Hero></Hero>
        {/* <QuickValueSection></QuickValueSection> */}
        {/* <div style={{height:'600px'}}></div> */}
        <HowItWorks></HowItWorks>
        {/* <TeamSection></TeamSection> */}
        <BlogSection></BlogSection>
        <AppDownloadSection></AppDownloadSection>
        {/* <FAQSection></FAQSection> */}
        <FinalCTA></FinalCTA>
      {/* <Footer></Footer> */}

      </div>

    </>
  )
}

export default HomePage
