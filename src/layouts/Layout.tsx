import React from 'react'
import Appbar from './appbar/Appbar.tsx'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <Appbar/>
      <div className='mt-20 px-20'>
        <Outlet/>
      </div>
    </>
  )
}

export default Layout