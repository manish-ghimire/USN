import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import {
  useHistory,
  useParams
} from 'react-router'
import axios from 'axios'
import {io} from 'socket.io-client'
import Navbar from '../../components/Navbar/Navbar'
import Conversation from '../../components/Conversations/Conversation'
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
import {
  MenuIcon,
  SchoolIcon
} from '@mui/icons-material/Menu'
import './Messenger.scss'


const Messenger = (props) => {

    const {
      window,
      setCircle
    } = props


    const history = useHistory()
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const userID = currentUser.user._id
    const user = currentUser.user
    const scrollRef = useRef()
    const socket = useRef()

    useEffect(() => {
      console.log("1")
    socket.current = io("ws://localhost:4000")
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
          console.log("2")
    arrivalMessage &&
      currentChat.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
          console.log("3")
    socket.current.emit("addUser", userID)
    socket.current.on("getUsers", (users) => {
        console.log("users", users)
      setOnlineUsers(
         user.following.filter((f) => users.some((u) => u.userId === f))
      )
    })
  }, [userID])

// console.log("messages" , messages)
    useEffect(() => {
            console.log("4")
        try {
      const getCon = async () => {

          const getConversations = await axios.get(`/conversation/${userID}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log('getConversations', getConversations)
          setConversations(getConversations.data)
        // } catch (err) {
        //   console.log(err)
        // }
      }
      getCon()
    } catch (err){
      console.log(err)
    }
  },[userID])

    useEffect(() => {
            console.log("5")
      console.log("currentChat", currentChat)
      if (currentChat){
        const getMessages = async () => {
    // try {
      const message = await axios.get(`/message/${currentChat._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setMessages(message.data)
      console.log(message.data)
    // } catch (err) {
    //   console.log(err)
    // }
  }
  getMessages()
}
}, [currentChat])
// console.log("userID",userID)
const handleSubmit = async (e) => {
  console.log("onsubmit")
    const message = {
      sender: userID,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find(
      (member) => member !== userID
    )

console.log(receiverId)
    socket.current.emit("sendMessage", {
      senderId: userID,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post("/message", message, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
     scrollRef.current?.scrollIntoView({ behavior: "smooth" })
   }, [messages])


   console.log("messages", messages);

          return (
            <>
            <Navbar / >
            <div className = "messenger" >
            <div className = "chatMenu" >
            <div className = "chatMenuWrapper" >
            <input placeholder = "Search for friends" className = "chatMenuInput" / >
            {
              conversations.map((c, index) => (
                <div key={index} onClick = {() => setCurrentChat(c)} >
                <Conversation conversations = {c} currentUser = {user} accessToken = {accessToken } />
                </div>
              )
            )
            }
            </div>
            </div>
            <div className = "chatBox" >
            <div className = "chatBoxWrapper" > {
              currentChat ? (
                <>
                <div className = "chatBoxTop" >
                {
                  messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} user={user} own={m.sender === userID} />
                    </div>
                  ))

                }

                </div>
                 <div className = "chatBoxBottom" >
                <textarea className = "chatMessageInput"
                placeholder = "write something..."
                onChange = {(e) => setNewMessage(e.target.value)}
                value = {newMessage} >
                < /textarea>
                <button className = "chatSubmitButton"
                onClick = {handleSubmit}>
                Send </button>
                </div>
                </>
              ) : (
                <span className = "noConversationText" >
                Open a conversation to start a chat.
                </span>
              )
            }
            </div>
            </div>
            <div className = "chatOnline" >
            <div className = "chatOnlineWrapper" >
            <ChatOnline onlineUsers = {onlineUsers}
            currentId = {userID}
            setCurrentChat = {setCurrentChat}
            accessToken={accessToken}
            />
            </div>
            </div>
            </div>
            </>
          )
        }

          export default Messenger
