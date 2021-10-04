import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import DefaultIcon from '../../images/128pxUser.png'
import PostingBox from '../../components/PostingBox/PostingBox.jsx'
import Post from '../../components/Post/Post.jsx'
import Grid from '@mui/material/Grid'
import './UniProfile.scss'

const posts = [
  {
    _id: 1,
    text: 'Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... ',
    shares: 10,
    likes: 52,
  },
  {
    _id: 2,
    text: 'Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni...  ',
    shares: 10,
    likes: 52,
  },
  {
    _id: 3,
    text: 'Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni ',
    shares: 10,
    likes: 52,
  },
  {
    _id: 4,
    text: 'Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... ',
    shares: 10,
    likes: 52,
  },
  {
    _id: 5,
    text: 'Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... Related to uni... ',
    shares: 10,
    likes: 52,
  },
]

const UniProfile = () => {
  useEffect(() => {
    try {
      // const success = axios.
    } catch (error) {}
  }, [])

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

export default UniProfile
