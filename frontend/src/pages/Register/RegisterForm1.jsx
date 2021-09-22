import { Button, TextField } from '@material-ui/core'
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'
import './Register1.scss'

import { React, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const form_theme = createTheme({
  palette: {
    primary: {
      main: '#0C6170', //'#37BEB0',
    },
    secondary: {
      main: '#37BEB0', //'#0C6170',
    },
  },
})

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    marginTop: '20px',
    width: '100%',
  },
  textField: {
    width: '100%',
    borderColor: 'white',
  },
}))

export default function RegisterForm() {
  const classes = useStyles()

  const history = useHistory()

  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirm_password = useRef()

  const submit_form = async (e) => {
    e.preventDefault()

    if (confirm_password.current.value !== password.current.value) {
      confirm_password.current.setCustomValidity('Two passwords not the same!')
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
    <ThemeProvider theme={form_theme}>
      <form noValidate autoComplete='off' onSubmit={submit_form}>
        <TextField
          required
          inputRef={username}
          label='Username'
          variant='outlined'
          margin='normal'
          className={classes.textField}
        />
        <br />
        <TextField
          required
          inputRef={email}
          type='email'
          label='Email'
          variant='outlined'
          margin='normal'
          className={classes.textField}
        />
        <br />
        <TextField
          required
          inputRef={password}
          type='password'
          label='Password'
          variant='outlined'
          margin='normal'
          className={classes.textField}
        />
        <br />
        <TextField
          required
          inputRef={confirm_password}
          type='password'
          label='Confirm-password'
          variant='outlined'
          margin='normal'
          className={classes.textField}
        />
        <br />
        {/* START - Register Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            onClick={submit_form}
            startIcon={<AddIcon color='secondary' />}
          >
            Create Account
          </Button>
        </div>
        {/* END - Register Button */}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            onClick={(e) => {
              history.push('/')
            }}
          >
            Back to Login
          </Button>
        </div>
      </form>
    </ThemeProvider>
  )
}
