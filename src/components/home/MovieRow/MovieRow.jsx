// MovieRow.jsx

import React, { useState, useEffect, useRef } from 'react';
import './MovieRow.css';
import axios from 'axios';

function MovieRow({ title, fetchUrl, wishlistService }) {
  const [movies, setMovies] = useState([]);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);

  const sliderRef = useRef(null);
  const sliderWindowRef = useRef(null);

  useEffect(() => {
    fetchMovies();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    calculateMaxScroll();
  }, [movies]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const getImageUrl = (path) => {
    return `https://image.tmdb.org/t/p/w300${path}`;
  };

  const slide = (direction, amount = null) => {
    const slideAmount =
      amount || sliderWindowRef.current.clientWidth * 0.8;
    if (direction === 'left') {
      setScrollAmount(Math.max(0, scrollAmount - slideAmount));
    } else {
      setScrollAmount(
        Math.min(maxScroll, scrollAmount + slideAmount)
      );
    }
  };

  const handleMouseMove = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (isScrolling) return;

    setIsScrolling(true);
    const direction = event.deltaY > 0 ? 'right' : 'left';
    slide(direction);

    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      const direction = touchDiff > 0 ? 'right' : 'left';
      slide(direction, Math.abs(touchDiff));
    }
  };

  const calculateMaxScroll = () => {
    if (sliderRef.current && sliderWindowRef.current) {
      const max =
        sliderRef.current.scrollWidth -
        sliderWindowRef.current.clientWidth;
      setMaxScroll(max > 0 ? max : 0);
    }
  };

  const handleResize = () => {
    calculateMaxScroll();
    setScrollAmount(Math.min(scrollAmount, maxScroll));
  };

  const toggleWishlist = (movie) => {
    wishlistService.toggleWishlist(movie);
  };

  const isInWishlist = (movieId) => {
    return wishlistService.isInWishlist(movieId);
  };

  const atLeftEdge = scrollAmount <= 0;
  const atRightEdge = scrollAmount >= maxScroll;

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div
        className="slider-container"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="slider-button left"
          onClick={() => slide('left')}
          style={{
            opacity: showButtons && !atLeftEdge ? 1 : 0,
          }}
          disabled={atLeftEdge}
        >
          &lt;
        </button>
        <div className="slider-window" ref={sliderWindowRef}>
          <div
            className="movie-slider"
            ref={sliderRef}
            style={{
              transform: `translateX(${-scrollAmount}px)`,
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => toggleWishlist(movie)}
              >
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                />
                {isInWishlist(movie.id) && (
                  <div className="wishlist-indicator">👍</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className="slider-button right"
          onClick={() => slide('right')}
          style={{
            opacity: showButtons && !atRightEdge ? 1 : 0,
          }}
          disabled={atRightEdge}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default MovieRow;
