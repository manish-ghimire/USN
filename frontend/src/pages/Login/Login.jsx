import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../../images/Logo.png'
import './Login.scss'
import axios from 'axios'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const Login = ({ setCircle, setSnackbar }) => {
  const history = useHistory()

  const username = useRef()
  const password = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value,
    }

    if (!username.current.value || !password.current.value) {
      setSnackbar({
        show: true,
        text: 'All fields are mandatory',
      })
      console.log('im hereeeeeee')
    } else {
      setCircle(true)
      try {
        const success = await axios.post('/auth/login', user)
        console.log(success)
        const userID = success.data.user._id
        localStorage.setItem('refreshToken', success.data.refreshToken)
        localStorage.setItem('accessToken', success.data.accessToken)
        setCircle(false)
        setSnackbar({
          show: true,
          sevirity: 'success',
          text: 'Login Successful',
        })
        history.push(`/user/${userID}`)
      } catch (error) {
        console.log(error)
        setCircle(false)
        setSnackbar({
          show: true,
          text: 'Wrong credentials',
        })
      }
    }
  }

  return (
    <div className='login-container'>
      <div className='leftDiv'>
        <img src={Logo} alt='USN logo' width='100px' />
        <div className='left-slogan'>Bla bla blaaa !</div>
      </div>
      <div className='rightDiv'>
        <div className='slogan-form-box'>
          <img src={Logo} alt='USN logo' width='200px' />
          <div className='slogan'>Join USNow!</div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
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
              onClick={handleSubmit}
            >
              Login
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
        </div>
      </div>
    </div>
  )
}

export default Login
