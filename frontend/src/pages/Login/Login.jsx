import React from 'react'
import Image from '../../images/Login_page_image.jpg'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'

const Login = () => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Box overflow='hidden' height='100vh'>
          <img src={Image} alt='USN Logo' />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box bgcolor='gray' height='100vh'>
          def
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login
