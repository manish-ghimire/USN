import { Link } from 'react-router-dom'
import { Divider } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React from 'react'
import Card from '../../components/Card/Card'
import './Post.scss'

const Post = ({ posts }) => {
  return posts.map((post) => (
    <Card key={post._id}>
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
    </Card>
  ))
}

export default Post
