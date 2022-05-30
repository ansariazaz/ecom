import './App.css';
import Header from './components/layout/header/Header.js'
import UserOptions from './components/layout/header/UserOptions.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import webfont from 'webfontloader'
import React from 'react';
import Footer from './components/layout/footer/Footer';
import Home from './components/home/Home.js'
import ProductDetails from './components/product/ProductDetails.js'
import Products from './components/product/Products.js'
import Search from './components/product/Search.js' 
import LoginSignup from './components/user/LoginSignup';
import store from './Redux/store'
import { loadUser } from './Redux/features/userSlice';
import { useSelector } from 'react-redux';
import Profile from './components/user/Profile.js'
import ProtectedRoute from './components/route/ProtectedRoute';
function App() {
  const {user,isAuthenticated} = useSelector(state=>state.user)
   React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid-sans", "chilanka"],
      }
    })
  store.dispatch(loadUser())
  },[])
  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:keyword" element={<Products/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/account" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/login" element={<LoginSignup/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
