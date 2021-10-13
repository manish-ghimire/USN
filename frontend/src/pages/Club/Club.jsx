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

const Club = ({ setCircle }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const history = useHistory()
  const [club, setClub] = useState([])
  const [uni, setUni] = useState([])
  const [roles, setRoles] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
  const { clubId } = useParams()
  const [posts, setPosts] = useState([])
  const [courses, setCourses] = useState([])
  const [totalCourses, setTotalCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [faculties, setFaculties] = useState([])
  const accessToken = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('currentUser')).user
  const currentUni = JSON.parse(localStorage.getItem('currentUni'))
  useEffect(() => {
    setCircle(true)
    if (accessToken) {
      const fetchData = async () => {
        try {
          const successClub = await axios.get(`/club/${clubId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setClub(successClub.data)
          console.log('Success club', successClub.data)

          const successUni = await axios.get(`/uni/${successClub.data.uniId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setUni(successUni.data)
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
  }, [history, setCircle, setUni, accessToken])

  console.log('CLUB', club)

  const drawer = (
    <>
      <Card>
        <Box sx={{ textAlign: 'right', color: 'gray' }}>
          <EditIcon
            className='editIcon'
            fontSize='small'
            onClick={() => console.log('edit clicked')}
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
          <h3>{club.clubName}</h3>
        </Box>
      </Card>
      <Card>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={'About us'} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={club.desc}
              // onClick={() => alert('Go to faculty page')}
            />
          </ListItem>
        </List>
      </Card>
      <Card>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={'Facts'} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${
                club.clubMembers ? club.clubMembers.length : 'No'
              } Club members`}
            />
          </ListItem>
        </List>
      </Card>
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
              <PostingBox roles={roles} />
              {posts.map((p, index) => (
                <Post key={index} posts={p} />
              ))}
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <Hidden mdUp>
              <PostingBox roles={roles} />
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

export default Club
