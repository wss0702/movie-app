import React, { useEffect, useState } from "react";
import { BaseService } from "../../../client";
import "./PosterGrid.css";

export const PosterGrid = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // BaseService로 API 데이터 호출
        const response = await BaseService.RetrieveApiData("/discover/movie", "GET");

        // 응답에서 results 배열만 설정
        if (response && response.results) {
          setMovies(response.results);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError("Failed to fetch movies.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movies.length) {
    return <div className="loading-message">Loading movies...</div>;
  }

  return (
    <div className="poster-grid">
      {movies.map((movie) => (
        <div className="poster-card" key={movie.id}>
          <img
            className="poster-image"
            src={movie.poster_path ? BaseService.GetImageURL(movie.poster_path, "w500") : ""}
            alt={movie.title || movie.name}
          />
          <div className="poster-title">{movie.title || movie.name}</div>
        </div>
      ))}
    </div>
  );
};
