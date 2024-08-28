import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Navbar from '../components/Navbar';
import Profile from '../Pages/Profile';
import Signup from '../Pages/Signup';
import Contact from '../Pages/Contact';
import About from '../Pages/About';

const App = () => {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
