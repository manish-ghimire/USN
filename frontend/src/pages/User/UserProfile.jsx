import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const UserProfile = () => {
  const history = useHistory()
  const { userID } = useParams()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
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
  }, [history, userID, accessToken])

  return (
    <>
      <Navbar />
      <div></div>
    </>
  )
}

export default UserProfile
