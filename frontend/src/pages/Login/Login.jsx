import React from 'react'
import './Login.scss'
import Logo from '../../images/Logo.png'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div className='login-container'>
      <div className='leftDiv'>
        <img src={Logo} alt='USN logo' className='center' width='100px' />
      </div>
      <div className='rightDiv'>
        <div className='slogan-form-box'>
          <div className='slogen'>LogiNow!</div>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  )
}

export default Login
