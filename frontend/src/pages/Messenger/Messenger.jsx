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
import Navbar from '../../components/Navbar/Navbar'
import Conversation from '../../components/Conversations/Conversation';
import Message from '../../components/Message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
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
    // const { userID } = useParams()
    const [user, setUser] = useState({})
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    // const socket = useRef();

    const accessToken = localStorage.getItem('accessToken')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const userID = currentUser.user._id
    const scrollRef = useRef();


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
            // console.log('Success user', successUser)
            setUser(successUser.data)
          } catch (error) {
            // console.log(error)
          }
        }
        fetchData()

      } else {
        console.log('Im here')
        history.push('/login', {
          text: 'hellooooooo'
        })
      }
      setCircle(false)
    }, [history, setCircle, setUser, userID, setConversations, accessToken])
    // console.log("userID", userID)
    // console.log("user", user)
    console.log("conversation", conversations)
    useEffect(() => {
      // scrollRef.current.scrollIntoView({
      //   behavior: "smooth"
      // });
    }, [messages]);
console.log("messages" , messages)
    useEffect(() => {
      const getCon = async () => {
        // try {
          const getConversations = await axios.get(`/conversation/${userID}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          // console.log('getConversations', getConversations)
          setConversations(getConversations.data)
        // } catch (err) {
        //   console.log(err);
        // }
      }
      getCon()
    },[userID])

    useEffect(() => {
      console.log("currentChat", currentChat)
      if (currentChat){
  const getMessages = async () => {
    // try {
      const res = await axios.get(`/message/${currentChat._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessages(res.data);
      console.log(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  getMessages();
}
}, [currentChat]);
console.log("userID",userID)
const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userID,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.id
    );

    // socket.current.emit("sendMessage", {
    //   senderId: user.id,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      const res = await axios.post("/message", message, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

          return (
            <>
            <Navbar / >
            <div className = "messenger" >
            <div className = "chatMenu" >
            <div className = "chatMenuWrapper" >
            <input placeholder = "Search for friends" className = "chatMenuInput" / >
            {
              conversations.map((c) => (
                <div onClick = {() => setCurrentChat(c)} >
                <Conversation conversations = {c} user = {user} accessToken = {accessToken } />
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
                <div className = "chatBoxTop" > {
                  messages.map((m) => (
                    <div ref = {scrollRef} >
                    <Message message={m} user={user}  own={m.sender === userID} />
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
            currentId = {user._id}
            setCurrentChat = {setCurrentChat}/>
            </div>
            </div>
            </div>
            </>
          )
        }

          export default Messenger
