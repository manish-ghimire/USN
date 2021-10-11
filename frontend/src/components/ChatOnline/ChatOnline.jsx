import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat, accessToken}) => {
const [followings, setFollowings] = useState([]);
const [followingsOnline, setFollowingsOnline] = useState([]);
const [test, setTest] = useState(false);
useEffect(()=>{
  try{
  if (test){
const getFollowings = async () =>{
  const getUser = await axios.get(`/user/${currentId}/followers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(getUser)
    if (getUser){
  setFollowings(getUser.data)
}
}
getFollowings()
}
}catch (err){
  console.log(err);
}
}, [currentId])

useEffect(()=>{
  try{
setFollowingsOnline(followings.filter((f)=>{onlineUsers.includes(f.id)}))
}catch (err){
  console.log(err);
}
},[onlineUsers, followings])

const handleUserChatClick = async (user)=>{
  try{
  const getTwoUsers = await axios.get(`conversation/find/${currentId}/${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    setCurrentChat(getTwoUsers.data)
  }catch (err){
    console.log(err);
  }
}
// console.log(followings)
  return (
    <div className="chatOnline">
    {followingsOnline.map((fo)=>(

        <div className="chatOnlineFollowing" onclick={()=>{handleUserChatClick(fo)}}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={fo.profilePicture ? fo.profilePicture : 'https://picsum.photos/400/400'}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName" onClick={()=> setTest(true)}>{fo.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline
