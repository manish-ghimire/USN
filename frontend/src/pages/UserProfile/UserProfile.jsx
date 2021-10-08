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
    const [classOf, setClassOf] = useState([])
  // const [posts, setPosts] = useState([])
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const userUrl = `/user/${userId}`
          const successUser = await axios.get(userUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          // setUser(successUser.data)

          const user = successUser.data
          // user.study
            console.log(user.study);
          // const uniId = '615f9d6cf450994aac5b700b'
          const uniLists = []
        const unis =  user.study.map(async (uni, index)=>{

          const successUni = await axios.get(`/uni/${uni.uniId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
setUnis(successUni.data.uniName)

      console.log(successUni)
      const userz = user.study.map(async (user, index)=>{
        setClassOf(user.classOf);
      })

     })


        } catch (error) {
          console.log('Error fetching data', error)
        }
      }
      fetchData()
    } else {
      history.push('/login', { text: 'hellooooooo' })
    }
  }, [accessToken, history])

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
  const bla = [
    { uniName: 'University of Canberra', classOf: '2019' },
    { uniName: 'University of Sydney', classOf: '2021' },
  ]

  return (
    <>

      {/* {console.log('BLA', bla)} */}
      {/* {console.log('USER', user)} */}
      {/* {console.log('UNIS', unis)} */}
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
                  {/* <div>
                    {user.fName} {user.lName}kkkkkkkk
                  </div>
                  <div>{user.username}</div>
                  <div>{user.isFrom}</div>
                  <div>{user.role}</div> */}
                </Box>
                <Divider />
                <List>
                   {console.log('UNIS')}
                  <ListItem button>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={unis}
                      secondary={classOf}
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
        </Grid>
      </Container>
    </>
  )
}

export default UserProfile
