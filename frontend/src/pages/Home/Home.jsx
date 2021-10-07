import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.scss'
import Navbar from '../../components/Navbar/Navbar'
import { Container } from '@mui/material'

const Home = () => {
  const history = useHistory()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      history.push('/login')
    }
  }, [history])
  return (
    <>
      <Navbar />
      <Container disableGutters maxWidth='xl'>
        <div className='container'>This is Home page</div>
      </Container>
    </>
  )
}

export default Home
