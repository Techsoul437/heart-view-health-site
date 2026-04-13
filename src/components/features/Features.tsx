"use client"
import FinalCTA from '@/Ui/cta/FinalCTA'
import Navbar from '@/Ui/navbar/Navbar'
import React from 'react'
import Hero from './Hero'
import FeaturesSection from './FeatureSection'
import FeatureStorySection from './FeatureStory'

function Features() {
  return (
    <div className='page-bg'>
      <Navbar></Navbar>
      <Hero></Hero>
      <FeatureStorySection></FeatureStorySection>
      <FeaturesSection></FeaturesSection>

      <FinalCTA></FinalCTA>
    </div>
  )
}

export default Features
