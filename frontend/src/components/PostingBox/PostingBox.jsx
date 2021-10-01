import React, { useState } from 'react'
import './PostingBox.scss'
import { Button, TextField } from '@mui/material'

const PostingBox = () => {
  const [content, setContent] = useState('')

  const handleClick = (params) => {
    console.log(content)
  }

  return (
    <div className='postingbox'>
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
    </div>
  )
}

export default PostingBox
