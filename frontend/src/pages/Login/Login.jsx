import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../images/Login_page_image.jpg'
import Grid from '@material-ui/core/Grid'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  test: {
    color: 'red',
    bgcolor: 'blue',
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
                Login !
              </Button>
            </Box>
            <Box pt={5}>
              <Typography>
                <Link to='/register'>
                  No account yet? Click here to register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login
