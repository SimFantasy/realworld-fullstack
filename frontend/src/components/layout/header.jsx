import React from 'react'
import { NavBar } from '@/components'
import { RiRemixRunFill } from '@remixicon/react'

const Header = () => {
  return (
    <div className='h-14 bg-white'>
      <div className='container flex justify-between items-center h-full'>
        <div className='flex gap-2'>
          <RiRemixRunFill size={32} className='text-green-700' />
          <span className='text-2xl font-semibold text-green-500'>Conduit</span>
        </div>
        <NavBar />
      </div>
    </div>
  )
}

export default Header
