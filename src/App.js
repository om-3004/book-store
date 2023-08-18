import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Page/Login';
// import Signup from './Page/Signup';
import SignUp from './Page/Signup';
import NotFound from './Page/Notfound';
import Cart from './Page/Cart';
import { ToastContainer } from 'react-toastify';
import BookCard from './Component/BookCard';
import AllProducts from './Page/AllProducts';
import { useState } from 'react';
import LoginBottomNav from './Component/LoginBottomNav';
import { EditProduct } from './Page/EditProduct';
import UpdateProfile from './Page/UpdateProfile';
import BooksPagList from './Page/Books';
import { AddProduct } from './Page/AddProduct';



const App = () => {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element=<Login /> />
        <Route path='signup' element=<SignUp /> />
        <Route path='cart' element=<Cart /> />
        <Route path='/productlist' element=<AllProducts /> />
        <Route path='/editbook' element=<EditProduct /> />
        <Route path='/bookpaglist' element=<BooksPagList /> />
        <Route path='/addproduct' element=<AddProduct /> />
        <Route path='/updateprofile' element=<UpdateProfile /> />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <LoginBottomNav />
    </>
  );
}
export default App;

