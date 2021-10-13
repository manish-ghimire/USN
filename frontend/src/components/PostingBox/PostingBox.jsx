import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './PostingBox.scss'
import { Autocomplete, Button, TextField } from '@mui/material'
import Card from '../../components/Card/Card'

const PostingBox = ({ roles, postToId }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')).user
  const token = localStorage.getItem('accessToken')
  const [content, setContent] = useState('')
  const [selectedRoles, setSelectedRoles] = useState('')
  const [file, setFile] = useState(null)

  const handleClick = (params) => {
    const body = {
      userId: currentUser._id,
      desc: content,
      role: selectedRoles,
      postToId: postToId,
    }

    const pushData = async () => {
      try {
        const successPosting = await axios.post(`/post/`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('Success from Posting component', successPosting)
      } catch (error) {
        console.log(error)
      }
    }
    pushData()
    window.location.reload()
  }

  return (
    <Card height='255px'>
      <TextField
        fullWidth
        id='outlined-multiline-static'
        multiline
        rows={3}
        placeholder='Write your study hack...'
        onChange={(e) => setContent(e.target.value)}
      />
      <div className='show-to'>
        <Autocomplete
          multiple
          id='tags-outlined'
          onChange={(event, value) => setSelectedRoles(value)}
          options={roles}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label='Show posts only to' />
          )}
        />
      </div>
      <div className='post-button'>
        <Button onClick={handleClick} variant='contained'>
          POST NOW !
        </Button>
      </div>
    </Card>
  )
}

export default PostingBox
