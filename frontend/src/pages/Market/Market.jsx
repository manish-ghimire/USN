import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import './Market.scss'

const Market = () => {
  const history = useHistory()
  const accessToken = localStorage.getItem('accessToken')
  const [items, setItems] = useState([])

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const successMarket = await axios.get(`/market`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          setItems(successMarket.data)
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
        <Grid container spacing={2} justifyContent={'center'} padding={3}>
          {items.map((item) => (
            <Grid item xs={6} sm={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component='img'
                  height='150'
                  image='https://picsum.photos/150/150'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {item.itemName.substring(0, 18)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small'>Share</Button>
                  <Button size='small'>Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Market
