import './UserForm.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const UserForm = ({ newUser }) => {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
  });

  useEffect(() => {}, []);

  const navigate = useNavigate();

  const SubmitForm = async (e) => {
    e.preventDefault();

    const urlSuffix = newUser ? '/user/signup' : '/user/login';

    const bodyJson = newUser
      ? {
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          username: userInfo.username,
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
        }
      : {
          username: userInfo.username,
          password: userInfo.password,
        };

    const res = await fetch(process.env.REACT_APP_API_BASE + urlSuffix, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyJson),
    });

    if (res.ok) {
      navigate('/');
      return;
    } else {
      const error = await res.json();
      setUserInfo((prev) => ({ ...prev, errorMessage: error.message }));
    }
  };

  return (
    <div className='layout'>
      {/* Modal */}
      <form
        className='user-form'
        action={
          process.env.REACT_APP_API_BASE + newUser
            ? '/user/signup'
            : '/user/login'
        }
        method='POST'
        onSubmit={SubmitForm}
      >
        {newUser && (
          <>
            <label className='form-title' htmlFor='first_name'>
              First Name:
            </label>
            <input
              className='user-form-input'
              id='first_name'
              name='first_name'
              value={userInfo.first_name}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, first_name: e.target.value }))
              }
            />
            <label className='form-title' htmlFor='last_name'>
              Last Name:
            </label>
            <input
              className='user-form-input'
              id='last_name'
              name='last_name'
              value={userInfo.last_name}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, last_name: e.target.value }))
              }
            />
          </>
        )}
        <label className='form-title' htmlFor='username'>
          Username:
        </label>
        <input
          className='user-form-input'
          id='username'
          name='username'
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <label className='form-title' htmlFor='password'>
          Password:
        </label>
        <input
          className='user-form-input'
          id='password'
          name='password'
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        {newUser && (
          <>
            <label className='form-title' htmlFor='confirm-password'>
              Confirm Password:
            </label>
            <input
              className='user-form-input'
              id='confirm-password'
              name='confirm-password'
              value={userInfo.confirmPassword}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </>
        )}

        <button className='user-form-button'>
          {newUser ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      {userInfo.errorMessage && (
        <div className='error-container'>
          <p className='error-'>Error: {userInfo.errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
