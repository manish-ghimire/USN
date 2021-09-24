import { Button, TextField } from '@material-ui/core'
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'

import './Login.scss'

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

export default function LoginForm() {
  const classes = useStyles()
  const history = useHistory()
  const usernameOrEmail = useRef()
  const password = useRef()

  const submit_form = async (e) => {
    e.preventDefault()

    const user = {
      usernameOrEmail: usernameOrEmail.current.value,
      password: password.current.value,
    }
    try {
      await axios.post('/auth/login', user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemeProvider theme={form_theme}>
      <form noValidate autoComplete='off' onSubmit={submit_form}>
        <TextField
          required
          inputRef={usernameOrEmail}
          label='Username / Email'
          variant='outlined'
          margin='normal'
          className={classes.textField}
        />
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
        {/* START - Register Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            onClick={submit_form}
          >
            Login
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
              history.push('/register')
            }}
          >
            No account yet?
          </Button>
        </div>
      </form>
    </ThemeProvider>
  )
}
