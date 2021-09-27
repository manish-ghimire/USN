import { React, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import './Register.scss'
import axios from 'axios'
import { Button } from '@mui/material'

export default function RegisterForm() {
  const history = useHistory()

  const [open, setOpen] = useState(false)
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirm_password = useRef()

  const submit_form = async (e) => {
    e.preventDefault()

    setOpen(open)
    if (confirm_password.current.value !== password.current.value) {
      alert('Passwrods are not same')
      // Write code to display a popup of password not same
    } else if (email.current.value.indexOf('@') === -1) {
      alert('Email address is not valid')
      // Write code to display a popup of Email is not valid
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post('/auth/register', user)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={submit_form}>
        <TextField
          required
          fullWidth
          inputRef={username}
          label='Username'
          variant='outlined'
          margin='normal'
        />
        <TextField
          required
          fullWidth
          inputRef={email}
          type='email'
          label='Email'
          variant='outlined'
          margin='normal'
        />
        <TextField
          required
          fullWidth
          inputRef={password}
          type='password'
          label='Password'
          variant='outlined'
          margin='normal'
        />
        <TextField
          required
          fullWidth
          inputRef={confirm_password}
          type='password'
          label='Confirm password'
          variant='outlined'
          margin='normal'
        />
        <Button
          sx={{ my: 2 }}
          fullWidth
          variant='contained'
          color='primary'
          size='large'
          onClick={submit_form}
          startIcon={<AddIcon color='secondary' />}
        >
          Create Account
        </Button>

        <Button
          fullWidth
          variant='contained'
          color='primary'
          size='large'
          onClick={(e) => {
            history.push('/login')
          }}
        >
          Back to Login
        </Button>
      </form>
    </>
  )
}
