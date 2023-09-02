import { Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from "./pages/Signup"
import Login from './pages/Login'
import MainScreen from './pages/MainScreen'
import Explore from './pages/Explore'

function App() {
  

  return (
    <>
      <Routes>
        <Route path = "/signup" element= {<Signup/>} />
        <Route path = "/login" element= {<Login/>} />
        <Route path = "/main" element= {<MainScreen/>} />
        <Route path = "/explore/:location" element= {<Explore/>} />
      </Routes>
    </>
  )
}

export default App