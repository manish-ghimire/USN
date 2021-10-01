import { Link } from 'react-router-dom'
import { Divider } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React from 'react'
import './Post.scss'

const Post = () => {
  const post = {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maiores architecto vitae praesentium rem non cupiditate facilis tempora possimus voluptates? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates saepe dolorum praesentium ut debitis accusantium Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum officia beatae doloribus commodi omnis alias porro iure. Quae magnam sit at! Voluptas ratione soluta necessitatibus vitae explicabo delectus eligendi, corporis ducimus consectetur quod consequuntur mollitiaa?',
    id: 10,
    likes: 52,
    noOfComments: 52,
  }

  return (
    <>
      <div className='post-box'>
        <div className='post-text'>{post.text}</div>
        <Divider />
        <div className='react-links'>
          <div className='lefthalf'></div>
          <div className='righthalf'>
            <div className='share'>
              <Link to='/register'>
                <ShareIcon />
              </Link>
            </div>
            <div className='like'>
              <Link to='/register'>
                <FavoriteIcon />
              </Link>
            </div>
            <div className='comment'>12 Comments</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
