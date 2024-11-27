// App.js

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header/Header';


import WishlistPage from './components/pages/wishlist/Wishlist';
import PopularPage from './components/pages/popular/Popular';
import HomeMain from './components/pages/main/HomeMain';
import Login from './components/pages/signin/login';
import SearchPage from './components/pages/search/Search';
import { ToastContainer } from 'react-toastify';

function App() {
  useEffect(() => {
    console.log('앱이 정상적으로 렌더링되고 있습니다.');
  }, []);
  return (
    <div>

      <p>앱이 정상적으로 렌더링되고 있습니다.</p>
      <Routes>
        <Route path="/" element={<><Header /><HomeMain /></>} />
        <Route path="/wishlist" element={<><Header /><WishlistPage /></>} />
        <Route path="/popular" element={<><Header /><PopularPage /></>} />
        <Route path="/search" element={<><Header /><SearchPage /></>} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
