import React from 'react'
import './Home.scss'
import Navbar from '../../components/Navbar/Navbar'
import { Container } from '@mui/material'

const Home = () => {
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
