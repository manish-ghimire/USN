import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SchoolIcon from '@mui/icons-material/School'
import Navbar from '../../components/Navbar/Navbar'
import Post from '../../components/Post/Post.jsx'
import Card from '../../components/Card/Card'
import { Avatar, Container, Grid, Hidden } from '@mui/material'

const UserProfile = ({ setCircle }) => {
  const history = useHistory()
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [unis, setUnis] = useState([])
  // const [posts, setPosts] = useState([])
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const successUser = await axios.get(`/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          const uniLists = []
          successUser.data.study.map(async (uni, index) => {
            const successUni = await axios.get(`/uni/${uni.uniId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            uniLists.push({
              uniName: successUni.data.uniName,
              classOf: successUser.data.study[index].classOf,
            })
          })
          setUnis(uniLists)
          setUser(successUser.data)
        } catch (error) {
          console.log('Error fetching data', error)
        }
      }
      fetchData()
    } else {
      console.log('Im here')
      // history.push('/login', { text: 'hellooooooo' })
    }
  }, [accessToken, userId])

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

  return (
    <>
      <Navbar />
      <Container disableGutters maxWidth='xl' className='container'>
        <Grid container>
          <Hidden mdDown>
            <Grid item md={3}>
              <Card>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '20px',
                  }}
                >
                  <Avatar
                    alt='Memy Sharp'
                    src='https://picsum.photos/400/400'
                    sx={{ width: 100, height: 100, margin: '25px 0 15px 0' }}
                  />
                  <div>
                    {user.fName} {user.lName}kkkkkkkk
                  </div>
                  <div>{user.username}</div>
                  <div>{user.isFrom}</div>
                  <div>{user.role}</div>
                </Box>
                <Divider />
                <List>
                  {['A'].map((uni, index) => (
                    <h1 key={index}>{console.log(unis[0].classOf)}</h1>
                  ))}
                  <ListItem button>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={'uni.uniNameeeeeee'}
                      secondary={'uni.classOf'}
                      onClick={() => console.log('list item clicked')}
                    />
                  </ListItem>
                </List>
                <Divider />
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
                  />
                  <div>
                    {user.fName} {user.lName}zzzzzzzzzzzzzz
                  </div>
                </Box>
              </Card>
            </Grid>
          </Hidden>
          <Grid item xs={9}>
            <Hidden mdDown>
              <Post posts={posts} />
            </Hidden>
          </Grid>
          <Hidden mdUp>
            <Post posts={posts} />
          </Hidden>
        </Grid>
      </Container>
    </>
  )
}

export default UserProfile
