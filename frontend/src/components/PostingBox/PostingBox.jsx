import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './PostingBox.scss'
import { Button, TextField } from '@mui/material'
import Card from '../../components/Card/Card'

const PostingBox = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')).user
  const { uniId } = useParams()
  const token = localStorage.getItem('accessToken')
  const [content, setContent] = useState('')

  const handleClick = (params) => {
    const body = {
      userId: currentUser._id,
      desc: content,
      img: 'link',
      role: 'student',
      postToId: uniId,
    }
    const pushData = async () => {
      try {
        const successPosting = await axios.post(`/post/`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
    pushData()
  }

  return (
    <Card height='190px'>
      <TextField
        fullWidth
        id='outlined-multiline-static'
        multiline
        rows={3}
        placeholder='Write your thoughts...'
        onChange={(e) => setContent(e.target.value)}
      />
      <div className='post-button'>
        <Button onClick={handleClick} variant='contained'>
          POST NOW !
        </Button>
      </div>
    </Card>
  )
}

export default PostingBox
