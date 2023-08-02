import './App.css';
import Home from './Components/Home';
import Profile from './Components/Profile/Profile';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Linkedin from './Components/Linkedin';
import Header from './Components/Headers/Header';
import User from './Components/Profile/User';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Linkedin />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/users/:id' element={<User/>} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}
export default App;