import React from 'react'
import './Error.scss'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'

const Error = () => {
  const history = useHistory()
  return (
    <div className='fullpage'>
      <div className='bgimg-1'>
        <div className='caption'>
          <span className='errorcode'>- 404 -</span>
          <br />
          <span className='border'>
            We have found a page that doesn't exist
          </span>
          <br />
          <br />

          <Button
            variant='contained'
            onClick={(e) => {
              history.push('/')
            }}
          >
            Please Go back !
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Error
