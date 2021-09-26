import React from 'react'
import './Login.scss'
import Logo from '../../images/Logo.png'
import LoginForm from './LoginForm'

const Login = () => {
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
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  )
}

export default Login
