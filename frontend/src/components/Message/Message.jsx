<<<<<<< HEAD
import './message.scss'
import { format } from 'timeago.js'
=======
import "./message.css";
import { format } from 'timeago.js';
>>>>>>> e0b983ae6137cbe5d30312df6d833796561b6f29

const Message = ({ message, own, user }) => {
  return (
    <>
      <div className={own ? 'message own' : 'message'}>
        {own ? (
          <>
            <div className='messageTop'>
              <p className='messageText'>{message.text}</p>
              <img
                className='messageImg'
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : 'https://picsum.photos/400/400'
                }
                alt=''
              />
            </div>
          </>
        ) : (
          <>
            <div className='messageTop'>
              <img
                className='messageImg'
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : 'https://picsum.photos/400/400'
                }
                alt=''
              />
              <p className='messageText'>{message.text}</p>
            </div>
          </>
        )}
        <div className='messageBottom'>{format(message.createdAt)}</div>
      </div>
    </>
<<<<<<< HEAD
  )
=======
)
}
<div className="messageBottom">{format(message.createdAt)}</div>

</div>
</>
)
>>>>>>> e0b983ae6137cbe5d30312df6d833796561b6f29
}

export default Message
