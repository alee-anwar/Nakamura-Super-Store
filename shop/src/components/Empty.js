import { Box, Typography } from '@mui/material'
import React from 'react'
import Logo from '../assets/Loading dots.gif';

const Empty = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '65vh',
        width: '100%'
      }}
    >
      
      <Box component="img" src={Logo} sx={{ height: '10vh', width: 'auto' }} />
      {/* <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Page not found
      </Typography> */}
    </Box>
  )
}

export default Empty
