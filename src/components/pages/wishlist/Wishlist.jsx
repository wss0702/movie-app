// src/pages/wishlist/Wishlist.jsx
import React, { useState, useEffect } from "react";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Local Storage에서 찜 목록 가져오기
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("movieWishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // 찜 목록에서 영화 제거
  const handleRemove = (movieId) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem("movieWishlist", JSON.stringify(updatedWishlist)); // 로컬 스토리지 업데이트
  };

  // 찜 목록이 비어있는 경우 처리
  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <h1>My Wishlist</h1>
        <p className="empty-message">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      <div className="wishlist-grid">
        {wishlist.map((movie) => (
          <div key={movie.id} className="wishlist-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="wishlist-poster"
            />
            <div className="wishlist-info">
              <h3>{movie.title}</h3>
              <button
                className="remove-button"
                onClick={() => handleRemove(movie.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
