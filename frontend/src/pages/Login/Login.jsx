import React from 'react'
import Image from '../../images/Login_page_image.jpg'
import Grid from '@material-ui/core/Grid'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  imageoverlay: {
    color: 'linear-gradient(rgb(72,0,72,0.8), rgb(192,72,72,0.8))',
    backgroundSize: 'cover',
  },
}))

const Login = () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={8}>
        <Box overflow='hidden' height='100vh'>
          <img src={Image} alt='USN Logo' />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          height='100vh'
          bgcolor='#37BEB0'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            width='100%'
            textAlign='center'
            bgcolor='#DBF5F0'
            p={3}
            m={3}
            borderRadius='10px'
            boxShadow='0 0 25px white'
          >
            <Typography variant='h4'>Login USNow!</Typography>
            <Box pt={3}>
              <TextField
                fullWidth
                id='UsernameEmail'
                label='Username / Email'
                variant='outlined'
              />
            </Box>
            <Box pt={3}>
              <TextField
                fullWidth
                id='Password'
                label='Password'
                variant='outlined'
              />
            </Box>
            <Box pt={5}>
              <Button variant='contained' color='primary'>
                Success
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login
