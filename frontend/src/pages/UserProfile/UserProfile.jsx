import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import FormDialog from '../../components/FormDialog/FormDialog'
import Grid from '@mui/material/Grid';
import PostingBox from '../../components/PostingBox/PostingBox.jsx'

import "./UserProfile.scss"
import DefaultIcon from "../../images/128pxUser.png"

const UserProfile = ({ setCircle, setSnackbar }) => {
  const history = useHistory()
  const { userID } = useParams()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    setCircle(true);
    if (userID) {
      const fetchData = async () => {
        try {
          // const success = await axios.get(`/users/${userID}`)
          // console.log(success)
          // Fetch data - Need API route first
          console.log('UserProfile Successful')
        } catch (error) {
          console.log('UserProfile Failed')
        }
      }
      fetchData()
    } else if (accessToken) {
      console.log('AccessToken exists')
    } else {
      console.log('Im here')
      history.push('/login', { text: 'hellooooooo' })
    }
    setCircle(false);
  }, [history, userID, accessToken])

  
  return (
    <>
    <Navbar/>
    <Grid container>
      <Grid container className="sideBar" md={3} sm={4} xs={12}>
        <Grid md={5} sm={12} xs={12} >
          <img id="userIcon" src={DefaultIcon}/> 
        </Grid>
        <Grid md={7} sm={12} xs={12}>
          <div className="userInfo">
            Username<br/>
            Location<br/>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            {/*58 chars allowed for Short Discription*/}
          </div>
        </Grid>
      </Grid>
      
      <Grid md={9} sm = {8} xs={12}>
        <div className="postsContainer">
          <PostingBox/>
          <PostingBox/>
          <PostingBox/>
          
        </div>
      </Grid>
      
    </Grid>
    </>
  )
}

export default UserProfile
