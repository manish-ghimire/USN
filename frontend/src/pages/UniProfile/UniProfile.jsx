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
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp'
import GroupsIcon from '@mui/icons-material/Groups'
import { Avatar, Chip, Container, Grid, Hidden } from '@mui/material'

const drawerWidth = 300

const UniProfile = ({ setCircle }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const history = useHistory()
  const [clubs, setClubs] = useState([])
  const [uni, setUni] = useState([])
  const { uniId } = useParams()
  const [posts, setPosts] = useState([])
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    setCircle(true)
    if (accessToken) {
      const fetchData = async () => {
        try {
          const successUni = await axios.get(`/uni/${uniId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setUni(successUni.data)

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

          console.log(successPost.data)
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
  }, [history, setCircle, setUni, accessToken])

  const handleFollow = (params) => {
    alert('followed')
  }

  const drawer = (
    <div>
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
        <Hidden mdDown>
          <h3>{uni.uniName}</h3>
          <br />
          <Chip label='Follow me!' onClick={handleFollow} />
        </Hidden>
        <Hidden mdUp>
          <h4>{uni.uniName}</h4>
        </Hidden>
      </Box>
      <br />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <ArrowBackSharpIcon />
          </ListItemIcon>
          <ListItemText
            primary={`29 followers`}
            onClick={() => alert('Followers clicked')}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ArrowForwardSharpIcon />
          </ListItemIcon>
          <ListItemText
            primary={`20 following`}
            onClick={() => alert('Followings clicked')}
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
    </div>
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
              <Card>{drawer}</Card>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={4}>
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
                    sx={{ width: 100, height: 100, margin: '0px 0 15px 0' }}
                    onClick={handleDrawerToggle}
                  />
                  <Chip label='Follow me!' onClick={handleFollow} />
                </Box>
              </Card>
            </Grid>
          </Hidden>
          <Grid item xs={8}>
            <PostingBox />
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

export default UniProfile
