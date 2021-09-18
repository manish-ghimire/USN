import React from 'react'
import RegisterForm from './RegisterForm.jsx'
import './Register.scss'
import Logo from '../../images/Logo.png'

const Register = () => {
  return (<div className="register-container">
    <div className="leftDiv">
      <img src={Logo} alt='logo' className='center'/>
    </div>
    <div className="rightDiv">
      <div className="slogen">Join USNow</div>
      <RegisterForm></RegisterForm>
    </div>
  </div>)
}

export default Register
