import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
// import Navbar from '../src/components/Navbar';
import Profile from '../Pages/Profile'
import Signup from '../Pages/Signup';
import Contact from '../Pages/Contact';

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default App;
