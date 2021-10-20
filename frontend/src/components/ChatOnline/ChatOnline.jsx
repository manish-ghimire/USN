import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat, setNewChat, accessToken}) => {
  const [follows, setFollows] = useState([]);
const [currentChatfollowings, setCurrentChatfollowings] = useState([]);
const [currentChatfollowers, setCurrentChatfollowers] = useState([]);
const [userOnline, setUserOnline] = useState([]);
const [currentChatUser, setCurrentChatUser] = useState([]);
console.log("onlineUsers111", onlineUsers)
console.log("currentId111", currentId)



useEffect(() => {
  const getFollowings = async () => {
    const res = await axios.get(`/user/${currentId}/followings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
        console.log("res.data1", res.data)
        if(res.data){
    setCurrentChatfollowings(res.data);
  }
  }
getFollowings()
  const getFollowers = async () => {
    const res2 = await axios.get(`/user/${currentId}/followers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log("res2.data2", res2.data)
    if(res2.data){
    setCurrentChatfollowers(res2.data)
  }
  }

  getFollowers();
}, [currentId, setFollows]);
console.log("currentChatfollowings2", currentChatfollowings)
console.log("currentChatfollowers2", currentChatfollowers)





const handleUserChatClick = async (user) => {
  console.log('insidechatclick');
  try {
    const res = await axios.get(`/conversation/find/${currentId}/${user._id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if(!res.data){
      const body = {
        senderId: currentId,
        receiverId: user._id
        }
      const res = await axios.post(`/conversation`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log("res1", res)
    setNewChat(res);
  }
  else{
    console.log("res2")
    const res2 = await axios.get(`/conversation/find/${currentId}/${user._id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    setCurrentChat(res2.data);
  }
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  const followers = currentChatfollowers.filter((f) => !onlineUsers.includes(f._id))
    const followings = currentChatfollowings.filter((f) => !onlineUsers.includes(f._id))
    const datas = [...followers, ...followings]
      const follow = [...new Set(datas.map(u => {return u._id}))];
      const follow2 = [...new Set(datas.map(u => {return u.username}))];
            // const follow3 = [...new Set(datas.map(u => {return u.profilePicture}))];
          console.log("follow3", follow2)
      const follow4 = follow.map(u=>{
    return {_id:u}
    })
    const follow5 = follow2.map(u2=>{
    return {username:u2}
    })
    // const follow6 = follow3.map(u3=>{
    // return {profilePicture:u3}
    // })
    //
    const data = [...follow4, ...follow5]
    let data2 = []
    for(let x = 0; x < data.length/2; x++) {
    data2.push({...data[x + data.length/2], ...data[x]})
    }
    const data3 = [...new Set([...data2])]
// const followCurrent = [...new Set([...currentChatfollowers, ...currentChatfollowings])]
console.log("dataaa", datas)
console.log("dataaaaz", data3)


// const followCurrentFiltered = followCurrent.filter((f) => {
//   console.log(followCurrent.filter((f) => !onlineUsers.includes(f._id)))
// console.log("fff", f)
// })
setFollows(data3)
// console.log("followCurrentfil", followCurrentFiltered)
}, [setFollows, currentChatfollowers, currentChatfollowings, userOnline])
useEffect(() => {
console.log("cconlineUsers", onlineUsers)
  const followers = currentChatfollowers.filter((f) => onlineUsers.includes(f._id))
    const followings = currentChatfollowings.filter((f) => onlineUsers.includes(f._id))
  console.log("followerss", followers)
  console.log("followingss", followings)
const datas = [...followers,...followings]
  const follow = [...new Set(datas.map(u => {return u._id}))];
  const follow2 = [...new Set(datas.map(u => {return u.username}))];


  const follow3 = follow.map(u=>{
return {_id:u}
})
const follow4 = follow2.map(u2=>{
return {username:u2}
})



const data = [...follow3, ...follow4]
let data2 = []
for(let x = 0; x < data.length/2; x++) {
data2.push({...data[x + data.length/2], ...data[x]})
}


console.log("data2", data2)
console.log("datass", data)
    setUserOnline(data2)
}, [onlineUsers, setUserOnline]);
console.log("currentChatfollowings", currentChatfollowings)
console.log("currentChatfollowers", currentChatfollowers)
console.log("userOnline", userOnline)
console.log("onlineUsers", onlineUsers)
console.log("follows", follows)
  return (
    <>
    <div className="chatOnline">
        <div className="online">Online</div>
    {console.log("here-userOnlineee", userOnline)}
      {console.log("here-follows", follows)}
    { follows.map((o)=>(
        <div className="chatOnlineFollowing"  onClick={()=>handleUserChatClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o.profilePicture ? o.profilePicture : 'https://picsum.photos/400/400'}
              alt=""
            />

                <div className="chatOnlineBadgeOffline"></div>
                <span className="chatOnlineName">{o.username}</span>
          </div>

        </div>
      ))
    }
      {userOnline.map((p)=>(
          <div className="chatOnlineFollowing"  onClick={()=>handleUserChatClick(p)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={p.profilePicture ? p.profilePicture : 'https://picsum.photos/400/400'}
                alt=""
              />

                  <div className="chatOnlineBadge"></div>
                  <span className="chatOnlineName">{p.username}</span>
            </div>

          </div>
        ))
    }

   </div>
    </>

)
}

export default ChatOnline
