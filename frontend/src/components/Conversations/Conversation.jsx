import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

const Conversation = ({accessToken, conversation, userID}) => {
  const [user, setUser] = useState(null)
  console.log('zz');
console.log(userID)
useEffect(()=>{
  const followingId = conversation.members.find((m) => m !== userID)
  const getUser = async () => {
    const successUser = await axios.get(`/user/${followingId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
      setUser(successUser.data)
  console.log('Success successUser', successUser)
  }
  getUser()
},[accessToken, conversation, userID])
        console.log(user);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src=""
        alt=""/>

      <span className="conversationName">userID.username</span>
    </div>
  )
}


export default Conversation
