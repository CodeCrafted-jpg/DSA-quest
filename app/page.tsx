import CommunitySection from '@/components/CommunitySection'
import DemoShowcase from '@/components/DemoShowcase'
import FeatureGrid from '@/components/FeatureGrid'
import HeroSection from '@/components/HeroSection'
import React from 'react'

const page = () => {
  return (
      <div className="min-h-screen">
      <HeroSection />
      <FeatureGrid />
      <DemoShowcase />
      <CommunitySection />
    </div>
  )
}

export default page
