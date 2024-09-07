import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Navbar from '../components/Navbar';
import Profile from '../Pages/Profile';
import Edit from '../Pages/ProfileEdit';
import Signup from '../Pages/Signup';
import Contact from '../Pages/Contact';
import About from '../Pages/About';
import Post from '../Pages/Post';
import ProtectedRoute from './ProtectectRoute'; // Import the ProtectedRoute component
import NotFound from '../Pages/Error'; // Import your 404 page component
import EditBlogPostForm from '../Pages/EditPost';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<Edit />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile/post/:id" element={<EditBlogPostForm />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
