import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import './UserProfile.scss'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SchoolIcon from '@mui/icons-material/School'
import Navbar from '../../components/Navbar/Navbar'
import Post from '../../components/Post/Post.jsx'
import Card from '../../components/Card/Card'
import GroupsIcon from '@mui/icons-material/Groups'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import EditIcon from '@mui/icons-material/Edit'
import {
  Autocomplete,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Hidden,
  TextField,
} from '@mui/material'

const drawerWidth = 350

const UserProfile = ({ setCircle }) => {
  // ALL CONSTANTS
  const [mobileOpen, setMobileOpen] = useState(false)
  const history = useHistory()
  const { userId } = useParams()
  const [user, setUser] = useState([])
  const [unis, setUnis] = useState([])
  const [totalUnis, setTotalUnis] = useState([])
  const [selectedUni, setSelectedUni] = useState([])
  const [clubs, setClubs] = useState([])
  const [studyGroups, setStudyGroups] = useState([])
  const [posts, setPosts] = useState([])
  const [roles, setRoles] = useState([])
  const [position, setPosition] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
  const currentUser = JSON.parse(localStorage.getItem('currentUser')).user
  const accessToken = localStorage.getItem('accessToken')

  // ***** UPDATE A USER ************
  const fName = useRef()
  const lName = useRef()
  const desc = useRef()
  const currentCity = useRef()
  const isFrom = useRef()
  const [openUpdateUser, setOpenUpdateUser] = useState(false)
  const handleUpdateUser = (param) => {
    const body = {
      fName: fName.current.value,
      lName: lName.current.value,
      role: selectedRoles,
      desc: desc.current.value,
      currentCity: currentCity.current.value,
      isFrom: isFrom.current.value,
    }
    const putData = async () => {
      try {
        const successUser = await axios.put(`/user/${userId}`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(successUser)
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenUpdateUser(false)
    window.location.reload()
  }
  //******* UPDATE USER ENDS ******************* */

  // ***** UPDATE University to profile ************
  const classOf = useRef()
  const [openUpdateStudy, setOpenUpdateStudy] = useState(false)
  const handleUpdateStudy = (param) => {
    const body = {
      study: {
        uniId: selectedUni,
        classOf: classOf.current.value,
        position: position,
      },
    }
    const putData = async () => {
      try {
        console.log('im hereeeeee')
        const successUser = await axios.put(`/user/${userId}`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()

    // *********************************

    setUnis([
      ...unis,
      {
        sn: unis.length + 1,
        uniId: body.study.uniId._id,
        uniName: body.study.uniId.uniName,
        classOf: body.study.classOf,
        position: body.study.position,
      },
    ])

    // *********************************

    setOpenUpdateStudy(false)
    // window.location.reload()
  }
  //******* UPDATE UNIVERSITY to profile ENDS ********************/

  // ***** CREATE A STUDY GROUP ************
  const studyName = useRef()
  const studyDesc = useRef()
  const [openCreateStudyGroup, setOpenCreateStudyGroup] = useState(false)
  const handleCreateStudyGroup = (param) => {
    const body = {
      studyName: studyName.current.value,
      desc: studyDesc.current.value,
    }
    const putData = async () => {
      try {
        console.log('im hereeeeee')
        const success = await axios.post(`/study/register`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(success)
        setStudyGroups([...studyGroups, success.data])
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenCreateStudyGroup(false)
    // window.location.reload()
  }
  //******* CREATE A STUDY GROUP ********************/

  console.log(studyGroups)
  // USE-EFFECTS
  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        setCircle(true)
        try {
          const userUrl = `/user/${userId}`
          const successUser = await axios.get(userUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setUser(successUser.data)

          const successTotalUnis = await axios.get('/uni', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setTotalUnis(successTotalUnis.data)

          const successRoles = await axios.get('/role', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setRoles(successRoles.data[0].roles)

          if (successUser.data.study.length > 0) {
            let uniLists = []
            for (var i = 0; i < successUser.data.study.length; i++) {
              const successUni = await axios.get(
                `/uni/${successUser.data.study[i].uniId}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              uniLists.push({
                sn: i + 1,
                uniId: successUser.data.study[i].uniId,
                uniName: successUni.data.uniName,
                classOf: successUser.data.study[i].classOf,
                position: successUser.data.study[i].position,
              })
            }
            setUnis(uniLists)
          }

          let clubLists = []
          for (var j = 0; j < successUser.data.clubs.length; j++) {
            const successClub = await axios.get(
              `/club/${successUser.data.clubs[j]}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            clubLists.push(successClub.data)
          }
          setClubs(clubLists)

          let studyGroupLists = []
          for (var k = 0; k < successUser.data.studyGroups.length; k++) {
            const successStudyGroups = await axios.get(
              `/study/${successUser.data.studyGroups[k]}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            studyGroupLists.push(successStudyGroups.data)
          }
          setStudyGroups(studyGroupLists)

          const successPost = await axios.get(`/post?user=${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          let postLists = []
          for (var k = 0; k < successPost.data.length; k++) {
            postLists.push([successPost.data[k], successUser.data])
          }
          setPosts(
            postLists.sort((p1, p2) => {
              return new Date(p2[0].createdAt) - new Date(p1[0].createdAt)
            })
          )
        } catch (error) {
          console.log('Error fetching data', error)
        }
      }
      fetchData()
    } else {
      console.log('Im here')
      setCircle(false)
      history.push('/login', { text: 'hellooooooo' })
    }
    setCircle(false)
  }, [history, setCircle, userId, setUnis, accessToken])

  // Follow me function
  const followMe = async (userId) => {
    const body = { ...user, followers: currentUser._id }

    const successPut = await axios.put(`/user/${userId}/follow`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const successGet = await axios.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(successGet.data)
    setUser(successGet.data)
  }

  //UNI RELATED
  let ifUnis
  if (unis.length > 0) {
    ifUnis = unis.map((uni) => (
      <List key={uni.sn}>
        <ListItem button>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={uni.uniName}
            secondary={`${uni.position} / Year ${uni.classOf}`}
            onClick={() => history.push(`/uni/${uni.uniId}`)}
          />
        </ListItem>
      </List>
    ))
    let addMoreUnis = (
      <List>
        <ListItem button>
          <ListItemIcon>
            <ControlPointIcon />
          </ListItemIcon>
          <ListItemText
            primary={`Add more universities to your profile`}
            secondary={``}
            onClick={() => setOpenUpdateStudy(true)}
          />
        </ListItem>
      </List>
    )
    ifUnis.push(addMoreUnis)
  } else {
    ifUnis = (
      <List>
        <ListItem button>
          <ListItemIcon>
            <ControlPointIcon />
          </ListItemIcon>
          <ListItemText
            primary={`No University details yet`}
            secondary={``}
            onClick={() => setOpenUpdateStudy(true)}
          />
        </ListItem>
      </List>
    )
  }

  //CLUBS RELATED
  let ifClubs
  if (clubs.length > 0) {
    ifClubs = clubs.map((club) => (
      <List key={club._id}>
        <ListItem button>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText
            primary={club.clubName}
            secondary={club.desc}
            onClick={() => history.push(`/club/${club._id}`)}
          />
        </ListItem>
      </List>
    ))
  } else {
    ifClubs = (
      <ListItem button>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary={'No clubs joined yet'} secondary={''} />
      </ListItem>
    )
  }

  //Study Group RELATED
  let ifStudyGroups
  if (studyGroups.length > 0) {
    ifStudyGroups = studyGroups.map((studyGroup) => (
      <List key={studyGroup._id}>
        <ListItem button>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText
            primary={studyGroup.studyName}
            secondary={studyGroup.desc}
            onClick={() => history.push(`/study/${studyGroup._id}`)}
          />
        </ListItem>
      </List>
    ))
  } else {
    ifStudyGroups = (
      <ListItem button>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary={'No Study Groups yet'} secondary={''} />
      </ListItem>
    )
  }

  // NO POSTS RELATED
  let ifNoPosts
  if (posts.length < 1) {
    ifNoPosts = (
      <Card>
        <Box sx={{ textAlign: 'center' }}>No Posts to display.</Box>
      </Card>
    )
  }

  const drawer = (
    <>
      <Card>
        <Box sx={{ textAlign: 'right', color: 'gray' }}>
          <EditIcon
            className='editIcon'
            fontSize='small'
            onClick={() => setOpenUpdateUser(true)}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt='Memy Sharp'
            src='https://picsum.photos/400/400'
            sx={{ width: 100, height: 100, margin: '25px 0 15px 0' }}
          />
          <h3>
          {user.fName} {user.lName}
          </h3>
          <h5>{user.followers ? user.followers.length : '0'} Followers</h5>
          {currentUser._id === userId ? (
            ''
          ) : (
            <Button
              variant='contained'
              size='small'
              sx={{ marginTop: 2 }}
              onClick={() => followMe(user._id)}
            >
              {user.followers}
            </Button>
          )}
        </Box>
      </Card>
      <Card>{ifUnis}</Card>
      <Card>{ifClubs}</Card>
      <Card>{ifStudyGroups}</Card>
      <Card>
        <List>
          <ListItem button>
            <ListItemIcon>
              <ControlPointIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Create a study group'}
              onClick={() => setOpenCreateStudyGroup(true)}
            />
          </ListItem>
        </List>
      </Card>
    </>
  )

  const completeProfileDialog = (
    <>
      <Dialog open={openUpdateUser} onClose={() => setOpenUpdateUser(false)}>
        <DialogTitle>Please enter your details</DialogTitle>
        <DialogContentText>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fields left empty will also be
          stored empty.
        </DialogContentText>
        <Divider />
        <DialogContent>
          <Autocomplete
            multiple
            id='tags-outlined'
            onChange={(event, value) => setSelectedRoles(value)}
            options={roles}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label='Select current roles'
                placeholder='Select current roles'
              />
            )}
          />
          <TextField
            autoFocus
            margin='dense'
            id='fName'
            inputRef={fName}
            defaultValue={user.fName}
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
            defaultValue={user.lName}
            label='Last name'
            type='text'
            fullWidth
            variant='standard'
          />

          <TextField
            autoFocus
            margin='dense'
            id='desc'
            inputRef={desc}
            defaultValue={user.desc}
            label='Few words about you...'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='currentCity'
            inputRef={currentCity}
            defaultValue={user.currentCity}
            label='Current location'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='isFrom'
            inputRef={isFrom}
            defaultValue={user.isFrom}
            label='Originally from'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateUser(false)}>Cancel</Button>
          <Button onClick={handleUpdateUser}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )
  const completeStudyDialog = (
    <>
      <Dialog open={openUpdateStudy} onClose={() => setOpenUpdateStudy(false)}>
        <DialogTitle>University Details</DialogTitle>
        <Divider />
        <DialogContent>
          {/* <DialogContentText>Fields are set as strings</DialogContentText> */}
          <Autocomplete
            // multiple
            id='tags-outlined'
            onChange={(event, value) => setSelectedUni(value)}
            options={totalUnis}
            getOptionLabel={(option) => option.uniName}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label='Select a university'
                placeholder='Select a university'
              />
            )}
          />
          <br />
          <Autocomplete
            // multiple
            id='tags-outlined'
            onChange={(event, value) => setPosition(value)}
            options={roles}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label='Position' placeholder='Position' />
            )}
          />

          <TextField
            autoFocus
            margin='dense'
            id='classOf'
            inputRef={classOf}
            label='Year'
            type='text'
            fullWidth
            style={{ width: 350 }}
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateStudy(false)}>Cancel</Button>
          <Button onClick={handleUpdateStudy}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )

  const createStudyGroupDialog = (
    <Dialog
      open={openCreateStudyGroup}
      onClose={() => setOpenCreateStudyGroup(false)}
    >
      <DialogTitle>Study Group</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>Enter New Study Group Details</DialogContentText>

        <TextField
          autoFocus
          margin='dense'
          id='studyName'
          inputRef={studyName}
          label='Study Group Name'
          type='text'
          fullWidth
          variant='standard'
        />
        <TextField
          autoFocus
          margin='dense'
          id='studyDesc'
          inputRef={studyDesc}
          label='Study Description'
          type='text'
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenCreateStudyGroup(false)}>Cancel</Button>
        <Button onClick={handleCreateStudyGroup}>Create</Button>
      </DialogActions>
    </Dialog>
  )

  const sidebarSkeleton = (
    <>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              // marginTop: '57px',
              marginTop: '0px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )

  // RETURN
  return (
    <>
      <Navbar />
      {completeProfileDialog}
      {completeStudyDialog}
      {createStudyGroupDialog}
      {sidebarSkeleton}
      <Container disableGutters maxWidth='xl' className='container'>
        <Grid container>
          <Hidden mdDown>
            <Grid item md={4}>
              {drawer}
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12}>
              <Card height='190px'>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt='Memy Sharp'
                    src='https://picsum.photos/400/400'
                    sx={{ width: 100, height: 100, margin: '25px 0 15px 0' }}
                    onClick={() => setMobileOpen(!mobileOpen)}
                  />
                  {/* <div> {user.fName} {user.lName} </div> */}
                </Box>
              </Card>
            </Grid>
          </Hidden>
          <Grid item xs={8}>
            <Hidden mdDown>
              {ifNoPosts}
              {posts.map((p, index) => (
                <Post key={index} posts={p} />
              ))}
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <Hidden mdUp>
              {ifNoPosts}
              {posts.map((p, index) => (
                <Post key={index} posts={p} />
              ))}
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default UserProfile
