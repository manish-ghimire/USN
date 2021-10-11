import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Navbar from '../../components/Navbar/Navbar'
import { Autocomplete } from '@mui/material'

const Settings = () => {
  const [faculties, setFaculties] = useState([])
  const [selectedFaculty, setSelectedFaculty] = useState([])
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const successFaculties = await axios.get(`/faculty`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setFaculties(successFaculties.data)
      } catch (error) {
        console.log('Error fetching data', error)
      }
    }
    fetchData()
  }, [])

  console.log('Faculties', faculties)

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
  const [openCreatePost, setOpenCreatePost] = useState(false)

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
    setOpenCreatePost(false)
  }
  // ***************** CREATE A POST ENDS *******************************

  // ***************** CREATE A MARKET ITEM *******************************
  const marketuserId = useRef()
  const marketitemName = useRef()
  const marketitemDesc = useRef()
  const marketitemPrice = useRef()
  const marketitemLocation = useRef()
  const marketimg = useRef()
  const marketlikes = useRef()
  const marketrole = useRef()
  const marketpostToId = useRef()
  const [openCreateItem, setOpenCreateItem] = useState(false)

  const handleCreateItem = () => {
    const token = localStorage.getItem('accessToken')
    const body = {
      userId: marketuserId.current.value,
      itemName: marketitemName.current.value,
      itemDesc: marketitemDesc.current.value,
      itemPrice: marketitemPrice.current.value,
      itemLocation: marketitemLocation.current.value,
      img: marketimg.current.value,
      likes: marketlikes.current.value,
      role: marketrole.current.value,
      postToId: marketpostToId.current.value,
    }
    console.log('body', body)
    const putData = async () => {
      console.log(body.token)
      try {
        const successMarketItem = await axios.post(`/market/item`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('Market Item created:', successMarketItem)
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenCreateItem(false)
  }
  // ***************** CREATE A MARKET ITEM ENDS *******************************

  // ***************** CREATE A FACULTY *******************************
  const facultyName = useRef()
  const facultyDesc = useRef()
  const [openCreateFaculty, setOpenCreateFaculty] = useState(false)

  const handleCreateFaculty = () => {
    const token = localStorage.getItem('accessToken')
    const body = {
      facultyName: facultyName.current.value,
      facultyDesc: facultyDesc.current.value,
    }
    const putData = async () => {
      try {
        const successFaculty = await axios.post(`/faculty/register`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenCreateFaculty(false)
  }
  // ***************** CREATE A FACULTY ENDS *******************************

  // ***************** CREATE A COURSE *******************************
  const courseName = useRef()
  const courseDesc = useRef()
  const [openCreateCourse, setOpenCreateCourse] = useState(false)

  const handleCreateCourse = () => {
    console.log('Selected faculty', selectedFaculty)
    const token = localStorage.getItem('accessToken')
    const body = {
      courseName: courseName.current.value,
      courseDesc: courseDesc.current.value,
      facultyId: selectedFaculty._id,
    }
    const putData = async () => {
      try {
        const successCourse = await axios.post(`/course/register`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenCreateCourse(false)
  }
  // ***************** CREATE A COURSE ENDS *******************************

  return (
    <div>
      <Navbar />

      <div>
        <Button variant='outlined' onClick={() => setOpenUpdateUser(true)}>
          Update a user
        </Button>
        <Button variant='outlined' onClick={() => setOpenCreateUni(true)}>
          Create a university
        </Button>
        <Button variant='outlined' onClick={() => setOpenCreatePost(true)}>
          Create a post
        </Button>
        <Button variant='outlined' onClick={() => setOpenCreateItem(true)}>
          Create a market item
        </Button>
        <Button variant='outlined' onClick={() => setOpenCreateFaculty(true)}>
          Create a faculty
        </Button>
        <Button variant='outlined' onClick={() => setOpenCreateCourse(true)}>
          Create a course
        </Button>
      </div>

      {/***************** UPDATE A USER *******************************/}
      <Dialog open={openUpdateUser} onClose={() => setOpenUpdateUser(false)}>
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
          <Button onClick={() => setOpenUpdateUser(false)}>Cancel</Button>
          <Button onClick={handleUpdateUser}>Update a user</Button>
        </DialogActions>
      </Dialog>
      {/***************** UPDATE A USER ENDS *******************************/}

      {/***************** CREATE A UNIVERSITY *******************************/}
      <Dialog open={openCreateUni} onClose={() => setOpenCreateUni(false)}>
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
          <Button onClick={() => setOpenCreateUni(false)}>Cancel</Button>
          <Button onClick={handleCreateUni}>Create a university</Button>
        </DialogActions>
      </Dialog>
      {/***************** CREATE A UNIVERSITY ENDS *******************************/}

      {/***************** CREATE A POST *******************************/}
      <Dialog open={openCreatePost} onClose={() => setOpenCreatePost(false)}>
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
          <Button onClick={() => setOpenCreatePost(false)}>Cancel</Button>
          <Button onClick={handleCreatePost}>Create a Post</Button>
        </DialogActions>
      </Dialog>
      {/***************** CREATE A POST ENDS *******************************/}

      {/***************** CREATE A MARKET ITEM *******************************/}
      <Dialog open={openCreateItem} onClose={() => setOpenCreateItem(false)}>
        <DialogTitle>Create a market item</DialogTitle>
        <DialogContent>
          <DialogContentText>Fields are set as strings</DialogContentText>

          <TextField
            autoFocus
            margin='dense'
            id='marketuserId'
            inputRef={marketuserId}
            label='userId'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='marketitemName'
            inputRef={marketitemName}
            label='itemName'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='marketitemDesc'
            inputRef={marketitemDesc}
            label='itemDesc'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='marketitemPrice'
            inputRef={marketitemPrice}
            label='itemPrice'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='marketitemLocation'
            inputRef={marketitemLocation}
            label='itemLocation'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='marketimg'
            inputRef={marketimg}
            label='img'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='marketlikes'
            inputRef={marketlikes}
            label='likes'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='marketrole'
            inputRef={marketrole}
            label='role'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='marketpostToId'
            inputRef={marketpostToId}
            label='postToId'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateItem(false)}>Cancel</Button>
          <Button onClick={handleCreateItem}>Create a Post</Button>
        </DialogActions>
      </Dialog>
      {/***************** CREATE A MARKET ITEM ENDS *******************************/}

      {/***************** CREATE A FACULTY *******************************/}
      <Dialog
        open={openCreateFaculty}
        onClose={() => setOpenCreateFaculty(false)}
      >
        <DialogTitle>Create a faculty</DialogTitle>
        <DialogContent>
          <DialogContentText>Fields are set as strings</DialogContentText>

          <TextField
            autoFocus
            margin='dense'
            id='facultyName'
            inputRef={facultyName}
            label='Faculty Name'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='facultyDesc'
            inputRef={facultyDesc}
            label='Faculty Description'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateFaculty(false)}>Cancel</Button>
          <Button onClick={handleCreateFaculty}>Create a Faculty</Button>
        </DialogActions>
      </Dialog>
      {/***************** CREATE A FACULTY ENDS *******************************/}

      {/***************** CREATE A Course *******************************/}
      <Dialog
        open={openCreateCourse}
        onClose={() => setOpenCreateCourse(false)}
      >
        <DialogTitle>Create a Course</DialogTitle>
        <DialogContent>
          <DialogContentText>Fields are set as strings</DialogContentText>

          <TextField
            autoFocus
            margin='dense'
            id='courseName'
            inputRef={courseName}
            label='Course Name'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='courseDesc'
            inputRef={courseDesc}
            label='Course Description'
            type='text'
            fullWidth
            variant='standard'
          />
          <Autocomplete
            // multiple
            id='tags-outlined'
            onChange={(event, value) => setSelectedFaculty(value)}
            options={faculties}
            getOptionLabel={(option) => option.facultyName}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label='Select a faculty'
                placeholder='Select a faculty'
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateCourse(false)}>Cancel</Button>
          <Button onClick={handleCreateCourse}>Create a Course</Button>
        </DialogActions>
      </Dialog>
      {/***************** CREATE A Course ENDS *******************************/}
    </div>
  )
}

export default Settings
