import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Grid from '@mui/material/Grid'
import PostingBox from '../../components/PostingBox/PostingBox.jsx'
import Post from '../../components/Post/Post.jsx'

import './UserProfile.scss'
import DefaultIcon from '../../images/128pxUser.png'

const UserProfile = ({ setCircle, setSnackbar }) => {
  const history = useHistory()
  const { userID } = useParams()
  const accessToken = localStorage.getItem('accessToken')

  const [uniHist, setUniHist] = useState([])

  useEffect(() => {
    setCircle(true)
    if (userID) {
      const fetchData = async () => {
        try {
          // const success = await axios.get(`/users/${userID}`)
          // console.log(success)
          // Fetch data - Need API route first
          console.log('UserProfile Successful')
          // const success = axios.get('url')
          // setUniHist(success.blabla)
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
    setCircle(false)
  }, [history, userID, accessToken, setCircle])

  return (
    <div className='mainContainer'>
      <Navbar />
      <Grid container className='bodyContainer'>
        <Grid item className='sideBar' xs={12} md={3}>
          <Grid item md={5} sm={12} xs={12}>
            <img id='userIcon' src={DefaultIcon} alt='Default user' />
          </Grid>
          <Grid item md={7} sm={12} xs={12}>
            <div className='userInfo'>
              Username
              <br />
              Location
              <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              {/*58 chars allowed for Short Discription*/}
            </div>
            {uniHist.map((item) => {
              return <li>{item.name}</li>
            })}
          </Grid>
        </Grid>

        <Grid item xs={12} md={9}>
          <div className='postingContainer'>
            <PostingBox />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
          <div className='postsContainer'>
            <Post />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserProfile
