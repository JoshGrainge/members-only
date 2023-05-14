import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <h1>Members Only</h1>

      {user && (
        <div className='header-buttons'>
          <button onClick={() => navigate(`/user/${user._id}`)}>Profile</button>
          <button onClick={() => navigate('/user/logout')}>Log Out</button>
        </div>
      )}
      {!user && (
        <div className='header-buttons'>
          <button onClick={() => navigate('/user/login')}>Log in</button>
          <button onClick={() => navigate('/user/signup')}>Sign up</button>
        </div>
      )}
    </div>
  );
};

export default Header;
