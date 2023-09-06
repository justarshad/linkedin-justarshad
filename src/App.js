import './App.css';
import Feed from './Pages/Feed/Feed';
import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Header from './Components/Headers/Header';
import User from './Pages/User/User';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/users/:id' element={<User />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}
export default App;