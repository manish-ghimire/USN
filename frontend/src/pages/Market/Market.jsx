import { Grid, Paper } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

const Market = () => {
  return (
    <>
      <Navbar />
      <Grid container spacing={2} justifyContent={'center'} padding={3}>
        <Grid item xs={2}>
          <Paper>Hello</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper>Hello</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper>Hello</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper>Hello</Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Market
