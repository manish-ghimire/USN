import React, { useState, useRef } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Navbar from '../../components/Navbar/Navbar'

const Settings = () => {
  // ***************** UPDATE A USER *******************************
  const userID = useRef()
  const username = useRef()
  const fName = useRef()
  const lName = useRef()
  const isAdmin = useRef()
  const email = useRef()
  const password = useRef()
  const profilePicture = useRef()
  const coverPicture = useRef()
  const followers = useRef()
  const following = useRef()
  const roles = useRef()
  const desc = useRef()
  const currentCity = useRef()
  const isFrom = useRef()
  const uniID = useRef()
  const classOf = useRef()

  const [openUpdateUser, setOpenUpdateUser] = useState(false)

  const handleOpenUpdateUser = () => {
    setOpenUpdateUser(true)
  }
  const handleCloseUpdateUser = () => {
    setOpenUpdateUser(false)
  }
  const handleUpdateUser = () => {
    const body = {
      token: localStorage.getItem('accessToken'),
      userID: userID.current.value,
      username: username.current.value,
      fName: fName.current.value,
      lName: lName.current.value,
      isAdmin: isAdmin.current.value,
      email: email.current.value,
      password: password.current.value,
      profilePicture: profilePicture.current.value,
      coverPicture: coverPicture.current.value,
      followers: followers.current.value,
      following: following.current.value,
      role: roles.current.value,
      desc: desc.current.value,
      currentCity: currentCity.current.value,
      isFrom: isFrom.current.value,
      studyAt: {
        uniId: uniID.current.value,
        classOf: classOf.current.value,
      },
    }
    const putData = async () => {
      console.log(body.userID)
      console.log(body.token)
      try {
        const successUser = await axios.put(`/user/${body.userID}`, body, {
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        })
        console.log(successUser)
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenUpdateUser(false)
  }
  // ***************** UPDATE A USER ENDS *******************************

  // ***************** CREATE A UNI *******************************
  const uniName = useRef()
  const uniDisplayName = useRef()
  const uniEmail = useRef()
  const uniProfilePicture = useRef()
  const uniCoverPicture = useRef()
  const uniFollowers = useRef()
  const uniFollowings = useRef()
  const uniDesc = useRef()
  const uniAdmin = useRef()

  const [openCreateUni, setOpenCreateUni] = useState(false)

  const handleOpenCreateUni = () => {
    setOpenCreateUni(true)
  }
  const handleCloseCreateUni = () => {
    setOpenCreateUni(false)
  }
  const handleCreateUni = () => {
    const body = {
      token: localStorage.getItem('accessToken'),
      uniName: uniName.current.value,
      uniDisplayName: uniDisplayName.current.value,
      email: uniEmail.current.value,
      profilePicture: uniProfilePicture.current.value,
      coverPicture: uniCoverPicture.current.value,
      followers: uniFollowers.current.value,
      followings: uniFollowings.current.value,
      desc: uniDesc.current.value,
      uniAdmin: uniAdmin.current.value,
    }
    const putData = async () => {
      console.log(body.token)
      try {
        const successUni = await axios.post(`/uni/register`, body, {
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        })
        console.log('Uni created:', successUni)
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenCreateUni(false)
  }
  // ***************** CREATE A UNI ENDS *******************************

  // ***************** CREATE A POST *******************************
  const postUserId = useRef()
  const postDesc = useRef()
  const postImg = useRef()
  const postLikes = useRef()
  const postRole = useRef()
  const postToId = useRef()

  const [openCreatePost, setopenCreatePost] = useState(false)

  const handleOpenCreatePost = () => {
    setopenCreatePost(true)
  }
  const handleCloseCreatePost = () => {
    setopenCreatePost(false)
  }
  const handleCreatePost = () => {
    const body = {
      token: localStorage.getItem('accessToken'),
      userId: postUserId.current.value,
      desc: postDesc.current.value,
      img: postImg.current.value,
      likes: postLikes.current.value,
      role: postRole.current.value,
      postToId: postToId.current.value,
    }
    console.log('body', body)
    const putData = async () => {
      console.log(body.token)
      try {
        const successPost = await axios.post(`/post/`, body, {
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        })
        console.log('Post created:', successPost)
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setopenCreatePost(false)
  }
  // ***************** CREATE A POST ENDS *******************************

  return (
    <div>
      <Navbar />

      <div>
        <Button variant='outlined' onClick={handleOpenUpdateUser}>
          Update a user
        </Button>
        <Button variant='outlined' onClick={handleOpenCreateUni}>
          Create a university
        </Button>
        <Button variant='outlined' onClick={handleOpenCreatePost}>
          Create a post
        </Button>
      </div>

      {/***************** UPDATE A USER *******************************/}
      <Dialog open={openUpdateUser} onClose={handleCloseUpdateUser}>
        <DialogTitle>Update a user</DialogTitle>
        <DialogContent>
          <DialogContentText>Fields are set as strings</DialogContentText>

          <TextField
            autoFocus
            margin='dense'
            id='uesrID'
            inputRef={userID}
            label='userID'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='username'
            inputRef={username}
            label='Username'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='fName'
            inputRef={fName}
            label='First name'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='lName'
            inputRef={lName}
            label='Last name'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='isAdmin'
            inputRef={isAdmin}
            label='isAdmin'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='Email'
            inputRef={email}
            label='Email'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='password'
            inputRef={password}
            label='Password'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='profilePicture'
            inputRef={profilePicture}
            label='Profile Picture'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='coverPicture'
            inputRef={coverPicture}
            label='Cover Picture'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='followers'
            inputRef={followers}
            label='Followers'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='followings'
            inputRef={following}
            label='Followings'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='roles'
            inputRef={roles}
            label='Roles'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='desc'
            inputRef={desc}
            label='Description'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='currentCity'
            inputRef={currentCity}
            label='Current City'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='isFrom'
            inputRef={isFrom}
            label='Is from'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniID'
            inputRef={uniID}
            label='uniID'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='classOf'
            inputRef={classOf}
            label='classOf'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateUser}>Cancel</Button>
          <Button onClick={handleUpdateUser}>Update a user</Button>
        </DialogActions>
      </Dialog>
      {/***************** UPDATE A USER ENDS *******************************/}

      {/***************** CREATE A UNIVERSITY *******************************/}
      <Dialog open={openCreateUni} onClose={handleCloseCreateUni}>
        <DialogTitle>Create a university</DialogTitle>
        <DialogContent>
          <DialogContentText>Fields are set as strings</DialogContentText>

          <TextField
            autoFocus
            margin='dense'
            id='uniName'
            inputRef={uniName}
            label='uniName'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniDisplayName'
            inputRef={uniDisplayName}
            label='uniDisplayName'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniEmail'
            inputRef={uniEmail}
            label='uniEmail'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniProfilePicture'
            inputRef={uniProfilePicture}
            label='uniProfilePicture'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniCoverPicture'
            inputRef={uniCoverPicture}
            label='uniCoverPicture'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniFollowers'
            inputRef={uniFollowers}
            label='uniFollowers'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniFollowings'
            inputRef={uniFollowings}
            label='uniFollowings'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniDesc'
            inputRef={uniDesc}
            label='uniDesc'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='uniAdmin'
            inputRef={uniAdmin}
            label='uniAdmin'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateUni}>Cancel</Button>
          <Button onClick={handleCreateUni}>Create a university</Button>
        </DialogActions>
      </Dialog>
      {/***************** CREATE A UNIVERSITY *******************************/}

      {/***************** CREATE A POST *******************************/}
      <Dialog open={openCreatePost} onClose={handleCloseCreatePost}>
        <DialogTitle>Create a Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Fields are set as strings</DialogContentText>

          <TextField
            autoFocus
            margin='dense'
            id='postUserId'
            inputRef={postUserId}
            label='UserId'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='postDesc'
            inputRef={postDesc}
            label='Desc'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='postImg'
            inputRef={postImg}
            label='Img'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='postLikes'
            inputRef={postLikes}
            label='Likes'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='postRole'
            inputRef={postRole}
            label='Role'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='postToId'
            inputRef={postToId}
            label='To Id'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreatePost}>Cancel</Button>
          <Button onClick={handleCreatePost}>Create a Post</Button>
        </DialogActions>
      </Dialog>
      {/***************** CREATE A POST *******************************/}
    </div>
  )
}

export default Settings
