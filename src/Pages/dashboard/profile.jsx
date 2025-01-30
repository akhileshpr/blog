import React from 'react'
import FlexBetween from '../../components/flexbetween'
import { Box, Typography } from '@mui/material'

const Profile = () => {
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='90vh'>
      <Typography variant='h2' fontWeight='600'>
        Soon
      </Typography>
      <Typography>
        here user can update the profile
      </Typography>
    </Box>
  )
}

export default Profile