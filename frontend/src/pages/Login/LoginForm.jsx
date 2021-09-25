import { React, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import './Login.scss'

export default function LoginForm() {
  const [circle, setCircle] = useState(false)
  const [snackbar, setSnackbar] = useState(true)

  const history = useHistory()
  const username = useRef()
  const password = useRef()

  const submit_form = async (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value,
    }

    if (!username.current.value || !password.current.value) {
      alert('Both fields are mandatory')
      // Write code to display a popup saying both fields are mandatory
    } else {
      setCircle(true)
      try {
        const success = await axios.post('/auth/login', user)
        localStorage.setItem('refreshToken', success.data.refreshToken)
        localStorage.setItem('accessToken', success.data.accessToken)
        setCircle(false)
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
          label='Username / Email'
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
        <Button
          sx={{ my: 2 }}
          fullWidth
          variant='contained'
          color='primary'
          size='large'
          onClick={submit_form}
        >
          Login !
        </Button>

        <Button
          fullWidth
          variant='contained'
          color='primary'
          size='large'
          onClick={(e) => {
            history.push('/register')
          }}
        >
          No account yet?
        </Button>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={circle}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbar}
        autoHideDuration={10000}
        onClose={() => setSnackbar(false)}
      >
        <Alert
          onClose={() => setSnackbar(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          WRONG CREDENTIALS
        </Alert>
      </Snackbar>
    </>
  )
}
