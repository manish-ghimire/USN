import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import './Home.scss'
import { Box, textAlign } from '@mui/system'

const Home = () => {
  const history = useHistory()
  const accessToken = localStorage.getItem('accessToken')
  const [unis, setUnis] = useState([])
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const successUni = await axios.get(`/uni`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setUnis(successUni.data)
          const successClub = await axios.get(`/club`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setClubs(successClub.data)
        } catch (error) {
          console.log('Error fetching data', error)
        }
      }
      fetchData()
    } else {
      history.push('/login', { text: 'hellooooooo' })
    }
  }, [])

  return (
    <>
      <Navbar />
      <Container maxWidth='xl' className='container'>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h4'>Top universities in Australia</Typography>
        </Box>
        <Grid container spacing={2} justifyContent={'center'} padding={3}>
          {unis.slice(0, 6).map((uni, index) => (
            <Grid key={index} item xs={6} sm={4} md={2}>
              <Card onClick={() => history.push(`/uni/${uni._id}`)}>
                <CardMedia component='img' image={uni.profilePicture} />
              </Card>
            </Grid>
          ))}
        </Grid>
        <br />
        <Divider />
        <Divider />
        <Divider />
        <br />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h4'>Top Uni clubs in Australia</Typography>
        </Box>
        <Grid container spacing={2} justifyContent={'center'} padding={3}>
          {clubs.slice(0, 6).map((club, index) => (
            <Grid key={index} item xs={6} sm={4} md={2}>
              <Card onClick={() => history.push(`/club/${club._id}`)}>
                <CardMedia component='img' image={club.profilePicture} />
              </Card>
            </Grid>
          ))}
        </Grid>

        <br />
        <Divider />
        <Divider />
        <Divider />
        <br />
      </Container>
    </>
  )
}

export default Home
