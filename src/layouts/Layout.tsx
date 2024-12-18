import React from 'react'
import Appbar from './appbar/Appbar.tsx'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <Appbar />
      <div className='bg-slate-100 px-4 md:px-10 lg:px-20 mt-20 pb-40 min-h-screen'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout