import './index.css'
import Sidebar from './Pages/Sidebar'
import MainContent from './Pages/MainContent'
import RightSidebar from './Pages/RightSidebar'
function App() {

  return (
   <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <MainContent />
      
      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  )
}

export default App
