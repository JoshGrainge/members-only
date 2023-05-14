import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';

const HomePage = () => {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState(null);

  const [modalActive, setModalActive] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    GetMessages();
  }, []);

  const navigate = useNavigate();

  const GetMessages = () => {
    fetch(process.env.REACT_APP_API_BASE)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Error: ', err));
  };

  const AddMessage = async (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_BASE + '/message/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessages((prev) => [...prev, data]))
      .catch((err) => console.error('Error: ', err));

    setMessage('');
    setModalActive(false);
  };

  const GotoProfile = async () => {
    fetch(process.env.REACT_APP_API_BASE + '/users/' + user)
      .then((res) => res.json())
      .then((data) => console.log('data: ' + data));
  };

  return (
    <div className='layout'>
      <Header user={user} />
      <ul className='none-list comments-list'>
        <li>
          <h2 className='comments-header'>Messages:</h2>
        </li>
        {messages &&
          messages.map((message) => {
            return (
              <li key={message._id} className='comment'>
                <div className='user-info'>
                  <img
                    className='avatar'
                    src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                    alt='avatar'
                  />
                  <p className='username'>
                    Posted by: <strong>{message.user.username}</strong>
                  </p>
                </div>
                <em className='timestamp'>Posted: {message.timestamp}</em>
                <p className='comment-text'>{message.message}</p>
              </li>
            );
          })}
        {!messages && <h3>No messages</h3>}
      </ul>

      {/* Toggle modal on click */}
      {(user || true) && (
        <button
          className={'add-message-button' + (modalActive ? ' tilted' : '')}
          onClick={() => setModalActive((prev) => !prev)}
        >
          +
        </button>
      )}

      {/* Modal */}
      <div className={'modal' + (modalActive ? ' active' : '')}>
        <form
          className='modal-form'
          action={`${process.env.REACT_APP_API_BASE}/message/new`}
          method='POST'
          onSubmit={AddMessage}
        >
          <input
            hidden={true}
            id='user'
            name='user'
            value={user}
            readOnly={true}
          />
          <label className='modal-title' htmlFor='message'>
            New Message
          </label>
          <textarea
            id='message'
            name='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter text here...'
          />
          <button>Post</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
