import {Route, Routes } from 'react-router-dom';
import Login from '../src/Pages/Login';
import Home from '../src/Pages/Home';
// import Navbar from '../src/components/Navbar';
import Signup from '../src/Pages/Signup';


const App = () => {
  return (

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<Home/>} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
  );
};

export default App;
