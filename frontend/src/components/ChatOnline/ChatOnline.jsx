import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat, accessToken, userFollowings, userFollowers }) => {
const [userOnline, setUserOnline] = useState([]);
const [currentChatUser, setCurrentChatUser] = useState([]);
const [currentChatfollow, setCurrentChatfollow] = useState([]);

setUserOnline(onlineUsers)

useEffect(() => {
const getMyFollowers = async () =>{
  // console.log("currentId", currentId)



const followData = []
for (var i = 0; i < userOnline.length; i++) {
  const follow = await axios.get(`/user/${userOnline[i]}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  console.log("followData", followData);
  followData.push(follow.data)
}
setCurrentChatfollow(followData)
}
  getMyFollowers();
}, []);



useEffect(() => {
const followers = userFollowers.filter((f) => onlineUsers.includes(f._id))
const followings = userFollowings.filter((f) => onlineUsers.includes(f._id))

// setUserOnline([...new Set([...followers, ...followings])])

console.log("newusers", [...new Set([...followers, ...followings])]);
}, [])

const handleUserChatClick = async (user)=>{

  console.log("submit user", user)
  console.log("currentIdchat", currentId)
  const getTwoUsers = await axios.get(`/conversation/find/${currentId}/${user._id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      console.log("getTwoUsers.data", getTwoUsers.data)
    setCurrentChat(getTwoUsers.data)
console.log(user);

    const body = {
      senderId: currentId,
      receiverId: user,
    }
    const PostTwoUsers = await axios.post(`/conversation`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        console.log("PostTwoUsers", PostTwoUsers)

}

// console.log("userOnline", userOnline)
// console.log("followers", followers)
// console.log("currentChatfollow", currentChatfollow)
// console.log("followings", followings)
// console.log("userOnline", userOnline)

  return (
    <>
    <div className="chatOnline">
{
      currentChatfollow.map((o)=>(
        <div className="chatOnlineFollowing"  onClick={()=>handleUserChatClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o.profilePicture ? o.profilePicture : 'https://picsum.photos/400/400'}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>

      ))
    }
   </div>
    </>
  )
}

export default ChatOnline
