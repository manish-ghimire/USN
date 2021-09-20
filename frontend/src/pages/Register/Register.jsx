import React from 'react'
import './Register.scss'
import Logo from '../../images/Logo.png'
import RegisterForm from './RegisterForm'

const Register = () => {

  
  return (
    <div className="register-container">
      <div className='leftDiv'>
        <img src={Logo} alt="USN logo" className='center' width='100px'/>
      </div>
      <div className='rightDiv'>
        <div className='slogen'>
          Join USNow!
        </div>
        <div>
         <RegisterForm></RegisterForm>
        </div>

      </div>

    </div>
  )

}

export default Register
