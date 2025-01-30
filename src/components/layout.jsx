import { Box } from '@mui/material'
import React from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'

const Layout = () => {
  return (
  <>
        <Box display="flex" >
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
  </>
  )
}

export default Layout