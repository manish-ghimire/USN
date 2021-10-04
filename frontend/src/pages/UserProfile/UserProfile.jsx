import axios from 'axios'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Grid from '@mui/material/Grid'
import PostingBox from '../../components/PostingBox/PostingBox.jsx'
import Post from '../../components/Post/Post.jsx'
import './UserProfile.scss'
import DefaultIcon from '../../images/128pxUser.png'

const posts = [
  {
    _id: 1,
    text: 'This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. ',
    shares: 10,
    likes: 52,
  },
  {
    _id: 2,
    text: 'This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. ',
    shares: 10,
    likes: 52,
  },
]

const UserProfile = ({ setCircle, setSnackbar }) => {
  const history = useHistory()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setCircle(true)
    if (accessToken) {
      const fetchData = async () => {
        try {
          const success = await axios.get(`/users/6124bee645e6d377f039326f`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(success.data.username)
          // Fetch data - Need API route first
          console.log('UserProfile Successful')
        } catch (error) {
          // console.log(error)
        }
      }
      fetchData()
    } else {
      console.log('Im here')
      history.push('/login', { text: 'hellooooooo' })
    }
    setCircle(false)
  }, [history, setCircle, accessToken])

  return (
    <>
      <Navbar />
      <Grid container className='bodyContainer'>
        {/* SIDEBAR STARTS HERE */}
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
          </Grid>
        </Grid>
        {/* BODY STARTS HERE */}
        <Grid item xs={12} md={9}>
          <div className='postingContainer'>
            <PostingBox />
          </div>
          <div className='postsContainer'>
            <Post posts={posts} />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfile
