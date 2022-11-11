import './App.css';
import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './components/Task/TaskContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainBanner from './components/MainBanner';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login'
import Users from './components/Users/Users'
import Cart from './components/Cart/Cart'
import Addresses from './components/Addresses/Addresses'
import Task from './components/Task/Task'
import * as authService from "./services/AuthenticationService"
import Logout from './components/Logout/Logout';
import Clock from "./components/Clock"
import Register from './components/Register/Register';
import NotificationProvider from './contexts/NotificationContext';


import ChatHub from './components/ChatHub/ChatHub';

function App() {
  return (
    <>
      <div className="App container-fluid h-100">
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>
              <TaskProvider>
                <BrowserRouter>
                  <Header  {...authService.getUser} />
                  <Clock />
                  <ChatHub />
                  <Routes>
                    <Route path="/MainBanner" element={<MainBanner />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Categories" element={<Categories />} />
                    <Route path="/Orders" element={<Orders />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/Cart' element={<Cart />} />
                    <Route path='/Addresses' element={<Addresses />} />
                    <Route path='/Task' element={<Task />} />
                    <Route path='/Users' element={<Users />} />
                    <Route path='/Logout' element={<Logout />} />
                    <Route path='/Register' element={<Register />} />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </TaskProvider>
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </div>
    </>
  );
}

export default App;