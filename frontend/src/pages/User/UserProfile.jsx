import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const UserProfile = () => {
  const history = useHistory()
  const { userID } = useParams()
  const accessToken = localStorage.getItem('accessToken')

  // useEffect(() => {
  //   if (userID) {
  //     const fetchData = async () => {
  //       try {
  //         // const success = await axios.get(`/users/${userID}`)
  //         console.log('UserProfile Successful')
  //       } catch (error) {
  //         console.log('UserProfile Failed')
  //       }
  //     }
  //     fetchData()
  //   } else if (accessToken) {
  //     console.log('AccessToken exists')
  //   } else {
  //     console.log('Im here')
  //     history.push('/login', { text: 'hellooooooo' })
  //   }
  // }, [])

  return <div>This is UserProfile page</div>
}

export default UserProfile
