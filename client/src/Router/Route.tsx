import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Navbar from '../components/Navbar';
import Profile from '../Pages/Profile';
import Edit from '../Pages/profileEdit';
import Signup from '../Pages/Signup';
import Contact from '../Pages/Contact';
import About from '../Pages/About';
import Post from '../Pages/Post'

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
        <Route path="/post/" element={<Post />} />
        <Route path="/profile/edit" element={<Edit />} />
      </Routes>
    </>
  );
};

export default App;
