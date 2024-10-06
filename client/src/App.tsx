import Navbar from './Pages/Navbar'
import './index.css'
import Route  from './Router/Route'
import AllCart from './Pages/AllCart'
function App() {

  return (
    <div className='flex'>
      <Navbar />
      <AllCart/>
    </div>
  )
}

export default App
