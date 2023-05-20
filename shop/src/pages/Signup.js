import { Container, Typography } from '@mui/material'
import React from 'react'
import BreadcrumbsComponent from '../components/BreadcrumbsComponent'

const Signup = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
    <BreadcrumbsComponent name={"Sign Up"} path={"/signup"} />
    <Typography variant="h1" my={2}>
      Sign Up
    </Typography>
  </Container>
  )
}

export default Signup