import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import UserForm from './components/UserForm';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/user/login' element={<UserForm />} />
      <Route path='/user/signup' element={<UserForm newUser={true} />} />
    </Routes>
  );
}

export default App;
