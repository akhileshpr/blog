import React, { useState } from 'react'
import Navbar from '../components/navbar'
import PostWidget from '../widgets/post'
import Posts from '../widgets/posts'
import { Box } from '@mui/material'
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Box bgcolor='#F5F5F5'>
        <Navbar setSearchQuery={setSearchQuery}/>
        <Posts searchQuery={searchQuery} />
    </Box >
  )
}

export default Home