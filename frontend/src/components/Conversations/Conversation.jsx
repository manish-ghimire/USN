import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

const Conversation = ({accessToken, conversations, currentUser}) => {

// console.log(user);
  const [theUser, setTheUser] = useState(null)
useEffect(()=>{
  // try {
  const followingId = conversations.members.find((m) => m !== currentUser._id)
  console.log("followingIdzzzz",followingId)
  if (followingId){

const getUser = async () => {
  // try{
  const successUser = await axios.get(`/user/${followingId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    setTheUser(successUser.data);
  }
  // catch(err){
  //   console.log(err)
  // }
    // console.log('successUser', successUser.data)
  // }
  getUser()
}else{
  console.log("follow some users")
}
  // }catch (err){
  //   console.log(err);
  // }

}, [accessToken, conversations])

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={currentUser.profilePicture ? currentUser.profilePicture : ''}
        alt=""/>

      <span className="conversationName">{currentUser.username}</span>
    </div>
  )
}


export default Conversation
