import Footer from '@/components/Footer2'
import Navbar from '@/components/Navbar'
import React from 'react'

const layout =  async ({ children }: { children : React.ReactNode }) =>  {
  return (
        <main >
          
    <Navbar />
            <div>
                {children}
            </div>
            <Footer />
        </main>
  )
}

export default layout
