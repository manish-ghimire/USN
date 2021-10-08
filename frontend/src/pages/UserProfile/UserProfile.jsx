import React, { useState, useEffect, useLayoutEffect } from 'react'
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
import { SettingsInputCompositeSharp } from '@mui/icons-material'

const UserProfile = ({ setCircle }) => {
  const history = useHistory()
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [unis, setUnis] = useState([])
  const [blas, setBla] = useState([
    { uniName: 'University of Canberra', classOf: '2019' },
    { uniName: 'University of Sydney', classOf: '2021' },
  ])
  const [clubs, setClubs] = useState([])
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    console.log('FETCH DATA START')
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const userUrl = `/user/${userId}`
      const successUser = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const uniLists = []

      for (var i = 0; i < successUser.data.study.length; i++) {
        console.log('index ' + i + ' Step 1')
        const successUni = await axios.get(
          `/uni/${successUser.data.study[i].uniId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        console.log('index ' + i + ' Step 2 ' + successUni)
        uniLists.push({
          uniName: successUni.data.uniName,
          classOf: successUser.data.study[i].classOf,
        })

        console.log('index ' + i + ' Step 3')
      }
      setUnis(uniLists)

      /*
      await successUser.data.study.map(async (uni, index) => {
        console.log('STEP3')
        const successUni = await axios.get(`/uni/${uni.uniId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log('STEP3.5' + successUni)
        uniLists.push({
          uniName: successUni.data.uniName,
          classOf: successUser.data.study[index].classOf,
        })
        console.log('STEP4 push complete')
        setUnis(uniLists)
        console.log('STEP5 setunis')
      })
      */
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }

  function tester() {}

  console.log('BLAS', blas)
  console.log('UNIS', unis)

  return (
    <>
      {blas.map((bla) => (
        <h1>Hello</h1>
      ))}
      {unis.map((uni) => (
        <>
          <h1>{uni.uniName}</h1>
          <h1>{uni.classOf}</h1>
        </>
      ))}
    </>
  )
}

export default UserProfile
