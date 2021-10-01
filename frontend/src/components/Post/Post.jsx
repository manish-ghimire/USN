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
        <div className='avatar-area'>
          <img src='https://picsum.photos/200/200' alt='User' />
          <div className='details'>
            <div className='name'>Manish Ghimire</div>
            <div className='org'>University of Canberra</div>
          </div>
        </div>
        <Divider />
        <div className='post-text'>{post.text}</div>
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
              <span>
                <Link to='/register'>
                  <FavoriteIcon />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
