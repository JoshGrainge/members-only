import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const API_BASE = 'http://localhost:3001'

  const [user, setUser] = useState('6459061862f0b4c111711653');
  const [messages, setMessages] = useState();

  const [modalActive, setModalActive] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    GetMessages();
  }, []);

  const GetMessages = () => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Error: ', err));
  }

  return (
    <div className="layout">
      {/* Header */}
      <div className='header'>
        <h1>Members Only</h1>

        {user && <div className='header-buttons'>
          <button>Profile</button>
          <button>Log Out</button>
          </div>}
        {!user && <div className='header-buttons'>
          <button>Log in</button>
          <button>Sign up</button>
          </div>}
      </div>
      <ul className='none-list comments-list'>
        <li>
          <h2 className='comments-header'>Messages:</h2>
        </li>
        {messages && messages.map(message => {
        return (
        <li key={message._id} className='comment'>
          <div className='user-info'>
            <img className='avatar'
                 src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                 alt='avatar'/>
            <p className='username'>Posted by: <strong>{message.user.username}</strong></p>
          </div>
          <em className='timestamp'>Posted: {message.timestamp}</em>
          <p className='comment-text'>{message.message}</p>
        </li>)
      })}
        {!messages && <h3>No messages</h3>}
      </ul>

      {/* Toggle modal on click */}
      {(user || true) && <button className='add-message-button' onClick={()=> setModalActive(prev=>!prev)}>+</button>}

      {/* Modal */}
      {modalActive && 
      <div className='modal'>
        <form action={`${API_BASE}/message/new`} method='POST' onSubmit={AddMessage}>
          <input hidden={true} id='user' name='user' value={user} readOnly={true}/>
          <label htmlFor='message'>Message</label>
          <input id='message' name='message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
          <button>Submit</button>
        </form>
      </div>}
    </div>
  );
}

export default App;
