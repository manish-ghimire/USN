import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import PostingBox from '../../components/PostingBox/PostingBox.jsx'
import Post from '../../components/Post/Post.jsx'
import './UserProfile.scss'
import Container from '@mui/material/Container'
import UsersSidebar from '../../components/UsersSidebar/UsersSidebar'
import SchoolIcon from '@mui/icons-material/School'
import {
  Avatar,
  Divider,
  Box,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import Card from '../../components/Card/Card'

const posts = [
  {
    _id: 1,
    text: 'This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. ',
    shares: 10,
    likes: 52,
  },
  {
    _id: 2,
    text: 'This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. This is something related to user. ',
    shares: 10,
    likes: 52,
  },
]

const UserProfile = ({ setCircle, setSnackbar }) => {
  const history = useHistory()
  const { userID } = useParams()
  const [user, setUser] = useState({})
  // const [posts, setPosts] = useState({})

  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    setCircle(true)
    if (accessToken) {
      const fetchData = async () => {
        try {
          const successUser = await axios.get(`/users/${userID}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log(successUser)
          setUser(successUser.data)

          // const successPost = await axios.get(`/post/user=${userID}`, {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
          // })
          // console.log(successPost)
          // setUser(successPost.data)
        } catch (error) {
          // console.log(error)
        }
      }
      fetchData()
    } else {
      console.log('Im here')
      history.push('/login', { text: 'hellooooooo' })
    }
    setCircle(false)
  }, [history, setCircle, userID, accessToken])

  return (
    <>
      <Navbar />
      <Container disableGutters maxWidth='xl' className='container'>
        <UsersSidebar />
        <Grid container>
          <Hidden mdDown>
            <Grid item md={4}>
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
                  <div>
                    {user.fName} {user.lName}
                  </div>
                  <div>{user.studiesAt}</div>
                  <div>{user.isFrom}</div>
                  <div>{user.role}</div>
                </Box>
                <br />
                <Divider />
                <Typography>Educational Background</Typography>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={'University of Canberra'}
                      secondary={'Expected completion 2021'}
                      onClick={() => console.log('list item clicked')}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={'Frakfurt University'}
                      secondary={'2015-2021'}
                      onClick={() => console.log('list item clicked')}
                    />
                  </ListItem>
                </List>
                <Divider />
                <Typography>Clubs membership in</Typography>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={'Engineering Society Club'}
                      secondary={'University of Canberra'}
                      onClick={() => console.log('list item clicked')}
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Hidden>

          <Grid item xs={12} md={8}>
            <div className='postingContainer'>
              <PostingBox />
            </div>
            <div className='postsContainer'>
              <Post posts={posts} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default UserProfile
