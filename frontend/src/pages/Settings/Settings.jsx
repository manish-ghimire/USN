import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Navbar from '../../components/Navbar/Navbar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Settings = () => {
  const [openCreateNewUser, setOpenCreateNewUser] = useState(false)
  const handleClickOpen = () => {
    setOpenCreateNewUser(true)
  }
  const handleClose = () => {
    setOpenCreateNewUser(false)
  }
  const handleSubmitCreateNewUser = () => {
    console.log('new user submitted')
    setOpenCreateNewUser(false)
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth='xl'>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant='h5' component='div'>
              helloo
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              adjective
            </Typography>
            <Typography variant='body2'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </Container>

      <div>
        <Button variant='outlined' onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Button variant='outlined' onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Button variant='outlined' onClick={handleClickOpen}>
          Open form dialog
        </Button>
      </div>

      {/***************** CREATE NEW USER *******************************/}
      <Dialog open={openCreateNewUser} onClose={handleClose}>
        <DialogTitle>Create a new user</DialogTitle>
        <DialogContent>
          <DialogContentText>All fields are compulsory</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='username'
            label='Username'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Email'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitCreateNewUser}>Create user</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Settings
