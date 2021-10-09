import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

const Conversation = ({accessToken, conversations, user}) => {

// console.log(user);
  const [theUser, setTheUser] = useState(null)
useEffect(()=>{
  console.log("zzz");
  const followingId = conversations.members.find((m) => m !== user._id)
const getUser = async () => {
  const successUser = await axios.get(`/user/${followingId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    setTheUser(successUser.data);
    // console.log('successUser', successUser.data)
  }
  getUser()
  const getMessages = async () => {
    const successUser = await axios.get(`/message/${followingId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      setTheUser(successUser.data);
      // console.log('successUser', successUser.data)
    }
    getUser()
}, [accessToken, conversations, user])

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user.profilePicture ? user.profilePicture : 'https://picsum.photos/400/400'}
        alt=""/>

      <span className="conversationName">{user.username}</span>
    </div>
  )
}


export default Conversation
