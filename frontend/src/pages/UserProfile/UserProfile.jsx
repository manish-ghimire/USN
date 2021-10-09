import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
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
import {
  Autocomplete,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Hidden,
  TextField,
} from '@mui/material'

const drawerWidth = 300

const UserProfile = ({ setCircle }) => {
  // ALL CONSTANTS
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const history = useHistory()
  const { userId } = useParams()
  const [user, setUser] = useState([])
  const [unis, setUnis] = useState([])
  const [totalUnis, setTotalUnis] = useState([])
  const [selectedUni, setSelectedUni] = useState([])
  const [clubs, setClubs] = useState([])
  const [posts, setPosts] = useState([])
  const [roles, setRoles] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
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

  // ***** UPDATE A University ************
  const classOf = useRef()
  const [openUpdateStudy, setOpenUpdateStudy] = useState(false)
  const handleUpdateStudy = (param) => {
    const body = {
      study: {
        uniId: selectedUni,
        classOf: classOf.current.value,
      },
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
    setOpenUpdateStudy(false)
  }
  //******* UPDATE UNIVERSITY ENDS ******************* */

  // USE-EFFECTS
  useEffect(() => {
    setCircle(true)
    if (accessToken) {
      const fetchData = async () => {
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
          console.log(successTotalUnis.data)
          setTotalUnis(successTotalUnis.data)

          // DO NOT DELETE THIS
          // const successRoles = await axios.get('/role', {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
          // })
          // setRoles(successRoles.data[0].roles)

          console.log(successUser.data.study)
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
                uniId: successUser.data.study[i].uniId,
                uniName: successUni.data.uniName,
                classOf: successUser.data.study[i].classOf,
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

          const successPost = await axios.get(`/post?user=${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          let postLists = []
          for (var k = 0; k < successPost.data.length; k++) {
            postLists.push([successPost.data[k], successUser.data])
          }
          setPosts(postLists)
        } catch (error) {
          console.log('Error fetching data', error)
        }
      }
      fetchData()
    } else {
      console.log('Im here')
      history.push('/login', { text: 'hellooooooo' })
    }
    setCircle(false)
  }, [history, setCircle, userId, setUnis, accessToken])

  const drawer = (
    <>
      <Card>
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
          {user.fName ? (
            <h3>
              {user.fName} {user.lName}
            </h3>
          ) : (
            <Button
              variant='outlined'
              size='small'
              onClick={() => setOpenUpdateUser(true)}
            >
              Complete your profile !
            </Button>
          )}
        </Box>
        <br />
        <Divider />
        <List>
          {unis.map((uni, index) => {
            return (
              <ListItem key={index} button>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                  primary={uni.uniName}
                  secondary={`Class of ${uni.classOf}`}
                  onClick={() => history.push(`/uni/${uni.uniId}`)}
                />
              </ListItem>
            )
          })}
          <ListItem button>
            <ListItemIcon>
              <ControlPointIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Add ${
                unis.length > 0 ? 'more universities' : 'a first university'
              } to your profile`}
              secondary={``}
              onClick={() => setOpenUpdateStudy(true)}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          {clubs.map((club, index) => {
            return (
              <ListItem key={index} button>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={club.clubName}
                  secondary={club.desc}
                  onClick={() => history.push(`/club/${club._id}`)}
                />
              </ListItem>
            )
          })}
        </List>
      </Card>
      <Card>
        <List>
          <ListItem button>
            <ListItemIcon>
              <ControlPointIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Create a Club'}
              secondary={'click here if you wish to create a club'}
              onClick={() => alert('Club create form')}
            />
          </ListItem>
        </List>
      </Card>
    </>
  )

  const completeProfileDialog = (
    <>
      <Dialog open={openUpdateUser} onClose={() => setOpenUpdateUser(false)}>
        <DialogTitle>Update {user.username}</DialogTitle>
        <Divider />
        <DialogContent>
          {/* <DialogContentText>Fields are set as strings</DialogContentText> */}
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
                label='Select roles'
                placeholder='Select roles'
              />
            )}
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
        <DialogTitle>Update University</DialogTitle>
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
          <TextField
            autoFocus
            margin='dense'
            id='fName'
            inputRef={classOf}
            label='Class of'
            type='text'
            fullWidth
            // style={{ width: 350 }}
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
                  <div>{/* {user.fName} {user.lName} */}</div>
                </Box>
              </Card>
            </Grid>
          </Hidden>
          <Grid item xs={8}>
            <Hidden mdDown>
              <Post posts={posts} />
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <Hidden mdUp>
              <Post posts={posts} />
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default UserProfile
