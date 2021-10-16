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
    const [newChat, setNewChat] = useState(null)
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
  socket.current = io("ws://localhost:4000");
  socket.current.on("getMessage", (data) => {
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
}, []);
console.log("currentChat", currentChat)
useEffect(() => {
  arrivalMessage &&
    currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage, currentChat]);

useEffect(() => {
  socket.current.emit("addUser", user._id);
  socket.current.on("getUsers", (users) => {
    setOnlineUsers(
      user.following.filter((f) => users.some((u) => u.userId === f))
    );
  });
}, []);

useEffect(() => {
  const getConversations = async () => {
    try {
      const res = await axios.get(`/conversation/${user._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  getConversations();
}, [user._id]);

useEffect(() => {
  const getMessages = async () => {
    try {
      const res = await axios.get(`/message/${currentChat?._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  getMessages();
}, [currentChat]);

const handleSubmit = async () => {
  const message = {
    sender: user._id,
    text: newMessage,
    conversationId: currentChat._id,
  };

  const receiverId = currentChat.members.find(
    (member) => member !== user._id
  );

  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId,
    text: newMessage,
  });

  try {
    const res = await axios.post("/message", message, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    setMessages([...messages, res.data]);
    setNewMessage("");
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

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
                <Conversation conversation = {c} currentUser = {currentUser} accessToken = {accessToken } />
                </div>
              )
            )
            }
            </div>
            </div>
            <div className = "chatBox" >
            { console.log("currentChat", currentChat)}
            { console.log("newChat", newChat)}
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
                 <>
                 {
                   messages ? (
                <textarea className = "chatMessageInput"

                placeholder = "Say Hi..."


                onChange = {(e) => setNewMessage(e.target.value)}
                value = {newMessage} >
                < /textarea>
              ) :(
                <textarea className = "chatMessageInput"

                placeholder = "Send a message..."


                onChange = {(e) => setNewMessage(e.target.value)}
                value = {newMessage} >
                < /textarea>
              )
              }
              </>
                <button className = "chatSubmitButton"
                onClick = {handleSubmit}>
                Send </button>
                </div>
                </>
              ) : (
                newChat ? (
  <>
  <div className = "chatBoxTop" >
  {
    messages.map((m) => (
      <div ref={scrollRef}>
        <Message message={m}  onlineUsers = {onlineUsers} user={user} own={m.sender === userID} />
      </div>
    ))

  }

  </div>
   <div className = "chatBoxBottom" >
  <textarea className = "chatMessageInput"
  placeholder = "Say Hi!"
  onChange = {(e) => setNewMessage(e.target.value)}
  value = {newMessage} >
  < /textarea>
  <button className = "chatSubmitButton"
  onClick = {handleSubmit}>
  Send </button>
  </div>
  </>
                ): (
                <>
                <span className = "noConversationText" >
                Open a conversation to start a chat.
                </span>
                </>
              )

            )
          }

            </div>
            </div>
            <div className = "chatOnline">
            <div className = "chatOnlineWrapper" >
            <ChatOnline
            onlineUsers = {onlineUsers}
            currentId = {userID}
            setCurrentChat = {setCurrentChat}
              setNewChat = {setNewChat}
            accessToken={accessToken}
            />
            </div>
            </div>
            </div>
            </>
          )
        }

          export default Messenger
