"use client"
import FinalCTA from '@/Ui/cta/FinalCTA'
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import Hero from './Hero'
import FeaturesSection from './FeatureSection'
import FeatureFAQSection from './FeatureFAQSection'
import FeatureStorySection from './FeatureStory'
import Footer from '@/Ui/footer/Footer'

function Features() {
  return (
    <div className='page-bg'>
      <Navbar></Navbar>
      {/* <Hero></Hero> */}
      {/* <FeatureStorySection></FeatureStorySection> */}
      <FeaturesSection></FeaturesSection>
      <FeatureFAQSection></FeatureFAQSection>

      {/* <FinalCTA></FinalCTA> */}
      <Footer></Footer>
    </div>
  )
}

export default Features
