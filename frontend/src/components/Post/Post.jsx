import { Link, useHistory } from 'react-router-dom'
import { Divider } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React from 'react'
import Card from '../../components/Card/Card'
import './Post.scss'
import axios from 'axios'

const Post = ({ posts }) => {
  console.log("posts", posts);
  const history = useHistory()
  const accessToken = localStorage.getItem('accessToken')

  const likeUnlike = (post_id, user_id) => {
<<<<<<< HEAD
    console.log('The post id', post_id)
    console.log('The user id', user_id)
    // console.log('The user id', user_id)
    console.log('The access token1 is:', accessToken)
    const fetchData = async () => {
      try {
        console.log('The access token2 is:', accessToken)
        const success = await axios.put(`/post/${post_id}/like`, {
=======
      console.log('The post id', post_id)
      console.log('The user id', user_id)
    console.log("accessToken1",accessToken)
    // const userId = {
    //   id:
    // }
    const fetchData = async () => {
          console.log("accessToken2",accessToken)
      // try {
        const success = await axios.put(`/post/${post_id}/like`, {},  {
>>>>>>> e0b983ae6137cbe5d30312df6d833796561b6f29
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log('return', success)
      // } catch (error) {
      //   console.log(error)
      // }
    }
    fetchData()
  }

  return posts.map((post) => (
    <>
      {console.log(posts)}
      <Card key={post._id}>
        <div className='avatar-area'>
          <img
            src='https://picsum.photos/200/200'
            alt='User'
            onClick={() => history.push(`/user/${post[1]._id}`)}
          />
          <div className='details'>
            <div className='name'>{post[1].fName}</div>
            <div className='org'>{post[1].currentCity}</div>
          </div>
        </div>
<<<<<<< HEAD
        <Divider />
        <div className='post-text'>{post[0].desc}</div>
        <Divider />
        <div className='react-links'>
          <div className='lefthalf'></div>
          <div className='righthalf'>
            <div className='share'>
              <span>
                <Link to='/register'>
                  <ShareIcon />
                </Link>
              </span>
              <span onClick={() => likeUnlike(post[0]._id, post[1]._id)}>
                <FavoriteIcon />
                {post[0].likes.length === 0 ? '' : post[0].likes.length}
                {post[0].likes.length === 0
                  ? 'Click me'
                  : post[0].likes.length === 1
                  ? ' Like'
                  : ' Likes'}
              </span>
            </div>
=======
      </div>
      <Divider />
      <div className='post-text'>{post[0].desc}</div>
      <Divider />
      <div className='react-links'>
        <div className='lefthalf'></div>
        <div className='righthalf'>
          <div className='share'>
            <span>
              <Link to='/register'>
                <ShareIcon />
              </Link>
            </span>
          <span onClick={() => likeUnlike(post[0]._id, post[1]._id)}>
              <FavoriteIcon />
              {post[0].likes.length === 0 ? '' : post[0].likes.length}
              {post[0].likes.length === 0
                ? 'Click me'
                : post[0].likes.length === 1
                ? ' Like'
                : ' Likes'}
            </span>
>>>>>>> e0b983ae6137cbe5d30312df6d833796561b6f29
          </div>
        </div>
      </Card>
    </>
  ))
}

export default Post
