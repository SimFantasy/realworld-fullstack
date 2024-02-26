import React from 'react'
import { Header, Footer } from '@/components'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-srceen min-h-screen'>
      <Header />
      <main className='content-area'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
