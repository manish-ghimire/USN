import { React, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import './Register.scss'
import axios from 'axios'
import { Button } from '@mui/material'
import Logo from '../../images/Logo.png'

<<<<<<< Updated upstream
const Register = ({ setCircle, setSnackbar }) => {
  const history = useHistory()

  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirm_password = useRef()

  const submit_form = async (e) => {
    e.preventDefault()

    if (confirm_password.current.value !== password.current.value) {
      setSnackbar({
        show: true,
        text: 'Passwords are not same',
      })
    } else if (email.current.value.indexOf('@') === -1) {
      setSnackbar({
        show: true,
        text: 'Email address is not valid',
      })
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        setCircle(true)
        const success = await axios.post('/auth/register', user)
        console.log(success)
        setCircle(false)
        setSnackbar({
          show: true,
          sevirity: 'success',
          text: 'Registration successful.',
        })
        history.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
=======
const Register = () => {
>>>>>>> Stashed changes

  return (
    <div className='register-container'>
      <div className='leftDiv'>
        <img src={Logo} alt='USN logo' width='100px' />
        <div className='left-slogan'>Bla bla blaaa !</div>
      </div>
      <div className='rightDiv'>
        <div className='slogan-form-box'>
          <img src={Logo} alt='USN logo' width='200px' />
          <div className='slogan'>Join USNow!</div>
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
        </div>
      </div>
    </div>
  )
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
}

export default Register
