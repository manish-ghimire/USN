import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

const Conversation = ({conversation, onlineUsers, currentUser, accessToken}) => {
const [user, setUser] = useState(null)
const [userOnlne, setUserOnline] = useState(null)
console.log("currentUser", currentUser)
  useEffect(() => {
    const followId = conversation.members.find((m) => m !== currentUser._id);
console.log("followId", conversation.members.find((m) => m !== currentUser._id));
//   console.log("m", )
// }} ))
    const getFollowId = async () => {
      try {
        const res = await axios(`/user/${followId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(res.data);
        console.log("setuser", res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getFollowId();

}, [currentUser, conversation]);

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
