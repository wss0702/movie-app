// src/pages/wishlist/Wishlist.jsx
import React, { useEffect, useState } from "react";
import WishlistManager from "../../../hooks/useWishlist";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Wishlist 데이터를 로드합니다.
  useEffect(() => {
    setWishlist(WishlistManager.getWishlist());
  }, []);

  // 영화 제거 핸들러
  const handleRemove = (movieId) => {
    WishlistManager.removeFromWishlist(movieId);
    setWishlist(WishlistManager.getWishlist()); // 상태 업데이트
  };

  // Wishlist가 비어있는 경우 처리
  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty.</h2>
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
