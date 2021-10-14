import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

const Conversation = ({accessToken, conversations, currentUser}) => {

  const [user, setUser] = useState(null)
    console.log("currentUser", currentUser)
useEffect(()=>{

  // console.log("conversations", conversations.members.find((m) => m !== currentUser._id))
  const followingId = conversations.members.find((m) => m !== currentUser._id)
  console.log("followingId", followingId)
  // if (followingId){

const getUser = async () => {
  const successUser = await axios.get(`/user/${followingId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log("successUser.data", successUser.data)
    setUser(successUser.data);
  }

  getUser()

}, [accessToken, setUser, conversations])
console.log("user", user)
  return (
    <div className="conversation">
   <img
        className="conversationImg"
        src={user?.profilePicture ? user.profilePicture : 'https://picsum.photos/400/400'}
        alt=""/>

      <span className="conversationName">{user?.username}</span>
    </div>
  )
}


export default Conversation
