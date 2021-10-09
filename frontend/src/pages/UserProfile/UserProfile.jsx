import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
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
import GroupsIcon from '@mui/icons-material/Groups'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Avatar, Container, Grid, Hidden } from '@mui/material'

const drawerWidth = 300

const UserProfile = ({ setCircle }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const history = useHistory()
  const { userId } = useParams()
  const [user, setUser] = useState([])
  const [unis, setUnis] = useState([])
  const [clubs, setClubs] = useState([])
  const [posts, setPosts] = useState([])
  const accessToken = localStorage.getItem('accessToken')
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

          let clubLists = []
          for (var i = 0; i < successUser.data.clubs.length; i++) {
            const successClub = await axios.get(
              `/club/${successUser.data.clubs[i]}`,
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
          for (var i = 0; i < successPost.data.length; i++) {
            postLists.push([successPost.data[i], successUser.data])
          }
          setPosts(postLists)
          console.log(postLists)
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
  }, [history, setCircle, setUnis, accessToken])

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
          <h3>
            {user.fName} {user.lName}
          </h3>
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
                  secondary={`Expected completion ${uni.classOf}`}
                  onClick={() => history.push(`/uni/${uni.uniId}`)}
                />
              </ListItem>
            )
          })}
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

  return (
    <>
      <Navbar />
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              marginTop: '57px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
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
                    onClick={handleDrawerToggle}
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
