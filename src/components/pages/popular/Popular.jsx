import React, { useEffect, useState } from "react";
import { BaseService } from "../../../client"; // BaseService를 사용
import "./Popular.css"; // 스타일링 파일

function PopularMovies() {
  const [movies, setMovies] = useState([]); // 인기 영화 데이터 상태
  const [error, setError] = useState(null); // 에러 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // TMDB API 호출
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setIsLoading(true);
        const response = await BaseService.RetrieveApiData(
          "/movie/popular",
          "GET"
        );

        if (response && response.results) {
          setMovies(response.results); // 결과 데이터 저장
        } else {
          throw new Error("Invalid API response.");
        }
      } catch (err) {
        setError("Failed to fetch popular movies.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="popular-movies-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="popular-movie-card">
          <img
            className="movie-poster"
            src={BaseService.GetImageURL(movie.poster_path, "w500")}
            alt={movie.title || movie.name}
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-overview">
              {movie.overview.length > 100
                ? `${movie.overview.substring(0, 100)}...`
                : movie.overview}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PopularMovies;
// 위 코드에서는 인기 영화 목록을 가져오는 PopularMovies 컴포넌트를 만들었습니다.