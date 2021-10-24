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
import Typography from '@mui/material/Typography'
import Navbar from '../../components/Navbar/Navbar'
import PostingBox from '../../components/PostingBox/PostingBox.jsx'
import Post from '../../components/Post/Post.jsx'
import Card from '../../components/Card/Card'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp'
import GroupsIcon from '@mui/icons-material/Groups'
import EditIcon from '@mui/icons-material/Edit'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Hidden,
  TextField,
} from '@mui/material'

const drawerWidth = 350

const UniProfile = ({ setCircle }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const history = useHistory()
  const [clubs, setClubs] = useState([])
  const [uni, setUni] = useState([])
  const [roles, setRoles] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
  const { uniId } = useParams()
  const [posts, setPosts] = useState([])
  const [courses, setCourses] = useState([])
  const [totalCourses, setTotalCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [faculties, setFaculties] = useState([])
  const accessToken = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('currentUser')).user
  const currentUni = JSON.parse(localStorage.getItem('currentUni'))
  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const successUni = await axios.get(`/uni/${uniId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setUni(successUni.data)
          localStorage.setItem('currentUni', JSON.stringify(successUni.data))

          const successRoles = await axios.get('/role', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setRoles(successRoles.data[0].roles)

          let clubLists = []
          for (var i = 0; i < successUni.data.clubs.length; i++) {
            const successClub = await axios.get(
              `/club/${successUni.data.clubs[i]}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            clubLists.push(successClub.data)
          }
          setClubs(clubLists)

          const successPost = await axios.get(`/post?uni=${uniId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          let postLists = []
          for (var i = 0; i < successPost.data.length; i++) {
            const successUser = await axios.get(
              `/user/${successPost.data[i].userId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            postLists.push([successPost.data[i], successUser.data])
          }
          setPosts(
            postLists.sort((p1, p2) => {
              return new Date(p2[0].createdAt) - new Date(p1[0].createdAt)
            })
          )

          const totalCourses = await axios.get(`/course/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setTotalCourses(totalCourses.data)

          let coursesLists = []
          for (var i = 0; i < successUni.data.courseId.length; i++) {
            const successCourses = await axios.get(
              `/course/${successUni.data.courseId[i]}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            coursesLists.push(successCourses.data)
          }
          setCourses(coursesLists)

          let facultiesLists = []
          for (var i = 0; i < coursesLists.length; i++) {
            const successFaculties = await axios.get(
              `/faculty/${coursesLists[i].facultyId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            facultiesLists.push(successFaculties.data)
          }
          setFaculties(facultiesLists)
        } catch (error) {
          console.log('Error fetching data', error)
        }
      }
      fetchData()
    } else {
      console.log('Im here')
      history.push('/login', { text: 'hellooooooo' })
    }
  }, [history, setCircle, setUni, accessToken])

  // Follow me function
  const followMe = async (uniId) => {
    const body = { ...uni, followers: currentUser._id }

    const successPut = await axios.put(`/uni/${uniId}/follow`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const successGet = await axios.get(`/uni/${uniId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(successGet.data)
    setUni(successGet.data)
  }

  // Handle onFacultyClick
  const handleFacultyClick = (facultyId) => {
    console.log('faculty clicked', facultyId)
    setOpenShowCourses(true)
    const filteredCourses = courses.filter(
      (course) => course.facultyId === facultyId
    )
    console.log(filteredCourses)
  }

  // ***************** CREATE A COURSE *******************************
  const [openCreateCourse, setOpenCreateCourse] = useState(false)
  const handleUpdateCoursesToUni = () => {
    let idOfSelectedCourses = []
    selectedCourses.map((selectedCourse, index) => {
      idOfSelectedCourses.push(selectedCourse._id)
    })
    console.log('uni1', uni.courseId)
    console.log('uni2', idOfSelectedCourses)

    const body = { courseId: uni.courseId.concat(idOfSelectedCourses) }
    const putData = async () => {
      try {
        const successCourse = await axios.put(`/uni/${uniId}`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log('SUCCESS', successCourse)
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenCreateCourse(false)
    window.location.reload()
  }
  // ***************** CREATE A COURSE ENDS *******************************

  // ***************** SHOW COURSES *******************************
  const [openShowCourses, setOpenShowCourses] = useState(false)
  // ***************** SHOW COURSES ENDS *******************************

  // ***** CREATE A CLUB ************
  const clubName = useRef()
  const clubDesc = useRef()
  const [openCreateClub, setOpenCreateClub] = useState(false)
  const handleCreateClub = (param) => {
    const body = {
      clubName: clubName.current.value,
      desc: clubDesc.current.value,
      uniId: uniId,
    }
    const putData = async () => {
      try {
        console.log('im hereeeeee')
        const success = await axios.post(`/club/register`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(success)
      } catch (error) {
        console.log('error', error)
      }
    }
    putData()
    setOpenCreateClub(false)
    window.location.reload()
  }
  //******* CREATE A CLUB ends ********************/

  const dialogAddCourse = (
    <Dialog open={openCreateCourse} onClose={() => setOpenCreateCourse(false)}>
      <DialogTitle>Please select courses</DialogTitle>
      <Divider />
      <DialogContent>
        <Autocomplete
          multiple
          style={{ width: 350 }}
          id='tags-outlined'
          onChange={(event, value) => setSelectedCourses(value)}
          options={totalCourses}
          getOptionLabel={(option) => option.courseName}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label='Select select courses' />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenCreateCourse(false)}>Cancel</Button>
        <Button onClick={handleUpdateCoursesToUni}>Update</Button>
      </DialogActions>
    </Dialog>
  )

  const dialogViewCourses = (
    <Dialog open={openShowCourses} onClose={() => setOpenShowCourses(false)}>
      <DialogTitle>Available courses</DialogTitle>
      <Divider />
      <DialogContent>
        {courses.map((course) => (
          <Chip
            sx={{ marginX: 1 }}
            avatar={<Avatar alt='Uni' src={uni.profilePicture} />}
            label={course.courseName}
            variant='outlined'
            onClick={() => console.log(course._id)}
          />
        ))}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )

  const dialogCreateClub = (
    <>
      <Dialog open={openCreateClub} onClose={() => setOpenCreateClub(false)}>
        <DialogTitle>Please enter club details</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='clubName'
            inputRef={clubName}
            label='Club Name'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='clubDesc'
            inputRef={clubDesc}
            label='Club Description'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateClub(false)}>Cancel</Button>
          <Button onClick={handleCreateClub}>Club</Button>
        </DialogActions>
      </Dialog>
    </>
  )

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
            src={uni.profilePicture}
            sx={{ width: 150, height: 150, margin: '5px 0 15px 0' }}
          />
          <h3>{uni.uniName}</h3>
          <br />
          <h5>{uni.followers ? uni.followers.length : '0'} Followers</h5>
          <Button
            variant='contained'
            size='small'
            sx={{ marginTop: 1 }}
            onClick={() => followMe(uni._id)}
          >
            {uni.followers && uni.followers.includes(currentUser._id)
              ? 'Unfollow'
              : 'Follow'}
          </Button>
        </Box>
        <Box sx={{ textAlign: 'right', color: 'gray' }}>
          <EditIcon
            className='editIcon'
            fontSize='small'
            onClick={() => console.log('Uni edit clicked')}
          />
        </Box>
      </Card>
      <Card>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={'Faculties'} />
          </ListItem>
          <Divider />
          {faculties.map((faculty, index) => (
            <ListItem key={index} button>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText
                primary={faculty.facultyName}
                onClick={() => handleFacultyClick(faculty._id)}
              />
            </ListItem>
          ))}
        </List>
      </Card>

      {uni.uniAdmin && uni.uniAdmin.includes(currentUser._id) ? (
        <Card color='#e8fcc2'>
          <List>
            <ListItem button>
              <ListItemIcon>
                <ControlPointIcon />
              </ListItemIcon>
              <ListItemText
                // primary={`Add another faculty`}
                secondary={`Add a course`}
                onClick={() => setOpenCreateCourse(true)}
              />
            </ListItem>
          </List>
        </Card>
      ) : (
        ''
      )}
      {currentUser.isAdmin && (
        <Card color='#e8fcc2'>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={'Clubs at this University'} />
            </ListItem>
            <Divider />
            {clubs.map((club, index) => (
              <ListItem key={index} button>
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText
                  primary={club.clubName}
                  onClick={() => alert('Go to club page')}
                  onClick={() => history.push(`/club/${club._id}`)}
                />
              </ListItem>
            ))}
            <ListItem button>
              <ListItemIcon>
                <ControlPointIcon />
              </ListItemIcon>
              <ListItemText
                // primary={`Add another faculty`}
                secondary={`Add a club`}
                onClick={() => setOpenCreateClub(true)}
              />
            </ListItem>
          </List>
        </Card>
      )}
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

  return (
    <>
      <Navbar />
      {sidebarSkeleton}
      {/* {uni.uniAdmin && uni.uniAdmin.includes(currentUser._id)
        ? { dialogAddCourse }
        : ''} */}
      {dialogAddCourse}
      {dialogCreateClub}
      {dialogViewCourses}
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
              <PostingBox
                roles={roles}
                postToId={uniId}
                setPosts={(v) => setPosts([v, ...posts])}
              />
              {posts.map((p, index) => (
                <Post key={index} posts={p} />
              ))}
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <Hidden mdUp>
              <PostingBox
                roles={roles}
                postToId={uniId}
                setPosts={(v) => setPosts([v, ...posts])}
              />
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

export default UniProfile
