import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Appbar = () => {
  return (
    <AppBar color='inherit' elevation={0} position='fixed'>
        <Toolbar>
            <Typography>
                Admin Panel
            </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Appbar