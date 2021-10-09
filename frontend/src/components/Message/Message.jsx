import "./message.css";
// import { format } from 'timeago.js';

 const Message = ({ message, own, user }) => {
  return (
<>
    <div className={own ? "message own" : "message"}>

      {
        own ? (
<>
    <div className="messageTop">
<p className="messageText">{message.text}</p>
<img
  className="messageImg"
  src={user.profilePicture ? user.profilePicture : 'https://picsum.photos/400/400'}
  alt="" />
</div>
</>
    ) : (
      <>
      <div className="messageTop">
      <img
        className="messageImg"
        src={user.profilePicture ? user.profilePicture : 'https://picsum.photos/400/400'}
        alt=""
      />
      <p className="messageText">{message.text}</p>
</div>
    </>
)
}
<div className="messageBottom">{(message.createdAt)}</div>

</div>
</>
)
}

export default Message
