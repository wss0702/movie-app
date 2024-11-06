// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header/Header';

import WishlistPage from './components/MovieWishlist/MovieWishlist';

function App() {
  const token = import.meta.env.VITE_APP_TOKEN;

  console.log(token);

  return (
    <div>
      <Routes>
        <Route path="/" element={<><Header /><div>hello world!</div></>} />
        <Route path="/wishlist" element={<><Header /><WishlistPage /></>} />
      </Routes>
    </div>
  );
}

export default App;
