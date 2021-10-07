import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import Conversation from '../../components/Conversations/Conversation';
import Message from '../../components/Message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import {MenuIcon, SchoolIcon} from '@mui/icons-material/Menu'
import './Messenger.scss'


  const Messenger = (props) => {

    const { window, setCircle } = props


    const history = useHistory()
    // const { userID } = useParams()
    const [user, setUser] = useState({})
    const [conversation, setConversation] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const  userID = currentUser.user._id

    console.log(userID)
    // const userID = currentUser._id
    useEffect(() => {
      setCircle(true)
      if (accessToken) {

        const fetchData = async () => {
          try {
// console.log(userID.user._id);
              const successUser = await axios.get(`/user/${userID}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            console.log('Success user', successUser)
            setUser(successUser.data)
            console.log('here');



            const getConversations = await axios.get(`/conversation/${userID}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          console.log('Success getConversations', getConversations)
          setConversation(getConversations.data)
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
    }, [history, setCircle, setUser, setConversation, accessToken])


    return (
      <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
              { conversation.map((c)=>(<Conversation conversation={c} accessToken={accessToken} userID={userID} />))  }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
              <div className="chatBoxTop">

                      <Message />

                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                  ></textarea>
                  <button className="chatSubmitButton">
                    Send
                  </button>
                </div>
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
      </>
      );
  }

  export default Messenger
