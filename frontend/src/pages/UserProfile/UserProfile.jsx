import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import FormDialog from '../../components/FormDialog/FormDialog'

const UserProfile = ({ setCircle, setSnackbar }) => {
  const history = useHistory()
  const { userID } = useParams()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    setCircle(true);
    if (userID) {
      const fetchData = async () => {
        try {
          // const success = await axios.get(`/users/${userID}`)
          // console.log(success)
          // Fetch data - Need API route first
          console.log('UserProfile Successful')
        } catch (error) {
          console.log('UserProfile Failed')
        }
      }
      fetchData()
    } else if (accessToken) {
      console.log('AccessToken exists')
    } else {
      console.log('Im here')
      history.push('/login', { text: 'hellooooooo' })
    }
    setCircle(false);
  }, [history, userID, accessToken])

  return (
    <>
      <Navbar/>
      <div>
      <FormDialog/>
      </div>
      <div>

      </div>
    </>
  )
}

export default UserProfile
