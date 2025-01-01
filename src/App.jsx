import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostItem from './components/PostItem'
const App = () => {
  return (
    <div className="bg-[#2d3137]">
      <Router>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Register />} />
          <Route path='/postitem' element={<PostItem />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App