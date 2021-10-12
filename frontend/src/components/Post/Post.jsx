import { Link, useHistory } from 'react-router-dom'
import { Divider } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, {useState} from 'react'
import Card from '../../components/Card/Card'
import './Post.scss'
import axios from 'axios'
import { format } from 'timeago.js'

const Post = ({ posts }) => {
  console.log("posts", posts)
const [like, setLike] = useState(posts[0].likes.length)

  const history = useHistory()
  const accessToken = localStorage.getItem('accessToken')

  const likeUnlike = (post_id, user_id) => {
    const fetchData = async () => {
      console.log('accessToken2', accessToken)
      try {
        const success = await axios.put(
          `/post/${post_id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        console.log('return', success)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    window.location.reload()
  }


  return (

    <Card key={posts[0]._id}>
      <div className='avatar-area'>
        <img
          src='https://picsum.photos/200/200'
          alt='User'
          onClick={() => history.push(`/user/${posts[1]._id}`)}
        />
        <div className='details'>
          <div
            className='name'
            onClick={() => history.push(`/user/${posts[1]._id}`)}
          >
            {posts[1].fName}
          </div>
          <div className='org'>{format(posts[0].createdAt)}</div>
        </div>
      </div>
      <Divider />
      <div className='post-text'>{posts[0].desc}</div>
      <Divider />
      <div className='react-links'>
        <div className='lefthalf'></div>
        <div className='righthalf'>
          <div className='share'>
            <span className="shareIcon">
              <Link to='/register'>
                <ShareIcon />
              </Link>
            </span>
          <span className="postFavorite" onClick={() => likeUnlike(posts[0]._id, posts[1]._id)}>

              {posts[0].likes.length ? <FavoriteIcon /> : <FavoriteBorderIcon/>}


            </span>
              <span className="postLikeCounter">{like}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Post
