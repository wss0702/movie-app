// src/pages/popular/Popular.jsx
import React, { useState, useEffect } from "react";
import { BaseService } from "../../../client"; // API 서비스
import "./Popular.css";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'infinite'

  const moviesPerPage = 2; // 각 페이지에 표시할 영화 수

  useEffect(() => {
    // Fetch all movies
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await BaseService.RetrieveApiData(`/movie/popular`, "GET");
        setMovies(response.results);
        setTotalPages(Math.ceil(response.results.length / moviesPerPage));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // 현재 페이지의 영화 가져오기
  const getCurrentMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    return movies.slice(startIndex, startIndex + moviesPerPage);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="popular-page">
      <h1>Popular Movies</h1>
      <div className="view-mode-toggle">
        <button
          onClick={() => setViewMode("infinite")}
          className={viewMode === "infinite" ? "active" : ""}
        >
          Infinite Scroll
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={viewMode === "table" ? "active" : ""}
        >
          Table View
        </button>
      </div>

      {viewMode === "table" ? (
        <>
          <table className="movie-table">
            <thead>
              <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Release Date</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentMovies().map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.release_date}</td>
                  <td>{movie.vote_average}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}

      {isLoading && <div className="loading-message">Loading...</div>}
    </div>
  );
};

export default Popular;
