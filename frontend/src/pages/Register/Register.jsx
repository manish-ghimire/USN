import React from 'react'
import './Register.scss'
import Logo from '../../images/Logo.png'
import RegisterForm from './RegisterForm'

const Register = () => {
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
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  )
}

export default Register
