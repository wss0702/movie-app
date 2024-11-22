// src/components/main/Row.jsx
import React, { useState, useEffect } from "react";
import { BaseService } from "../../../../client"; // API 호출 서비스
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await BaseService.RetrieveApiData(fetchUrl, "GET");
        const results = response?.results || [];
        setMovies(results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  const handleScrollLeft = () => {
    document.querySelector(`#row-${title}`).scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    document.querySelector(`#row-${title}`).scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  const addToWishlist = (movie) => {
    const storedWishlist = JSON.parse(localStorage.getItem("movieWishlist")) || [];
    const exists = storedWishlist.some((item) => item.id === movie.id);
    if (!exists) {
      storedWishlist.push(movie);
      localStorage.setItem("movieWishlist", JSON.stringify(storedWishlist));
      alert(`${movie.title} has been added to your wishlist.`);
    } else {
      alert(`${movie.title} is already in your wishlist.`);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={handleScrollLeft}
          role="button"
        >
          <span className="arrow">◀</span>
        </div>
        <div className="row__posters" id={`row-${title}`}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${
                isLargeRow ? "row__posterLarge" : ""
              }`}
              src={`https://image.tmdb.org/t/p/w500${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title || movie.name}
              
              onClick={() => addToWishlist(movie)}
            />
          ))}
        </div>
        <div
          className="slider__arrow-right"
          onClick={handleScrollRight}
          role="button"
        >
          <span className="arrow">▶</span>
        </div>
      </div>
    </div>
  );
};

export default Row;
