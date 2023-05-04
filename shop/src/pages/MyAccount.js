import { Container, Typography } from '@mui/material'
import React from 'react'
import BreadcrumbsComponent from '../components/BreadcrumbsComponent'

const MyAccount = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <BreadcrumbsComponent name={"MyAccount"} path={"/account"} />
      <Typography variant="h1" my={2}>
        Account
      </Typography>
      </Container>
  )
}

export default MyAccount