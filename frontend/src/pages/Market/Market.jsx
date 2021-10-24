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
          console.log(successMarket.data)
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
          {items.map((item, index) => (
            <Grid item xs={6} sm={4} md={3}>
              <Card sx={{ maxWidth: 345, minHeight: 350, height: 350 }}>
                <CardMedia component='img' Height='150' image={item.img} />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {item.itemName.substring(0, 18)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {item.itemDesc.substring(0, 35)}
                  </Typography>
                </CardContent>
                <CardActions className='amount-cta'>
                  <Button size='small'>A${item.itemPrice}</Button>
                  <Button variant='contained' size='small'>
                    Buy!
                  </Button>
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
