import React, { useState } from "react";
import { BaseService } from "../../../client"; // BaseService를 사용
import "./Search.css";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    try {
      setError(null); // 오류 메시지 초기화
      // 검색어를 포함하여 API 요청을 보냅니다.
      const response = await BaseService.RetrieveApiData(
        `/search/movie?query=${encodeURIComponent(searchInput)}`,
        "GET"
      );

      if (response.results) {
        setSearchResults(response.results);
      } else {
        setSearchResults([]);
        setError("검색 결과가 없습니다.");
      }
    } catch (err) {
      setError("영화를 검색하는 중 오류가 발생했습니다.");
      console.error("API 호출 오류:", err);
    }
  };

  const getImageUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder-image.jpg";

  return (
    <div className="container-search">
      <h2>검색</h2>
      <div className="container-search-bar">
        <div className="input-container">
          <input
            type="text"
            className={`content-search ${searchInput ? "has-value" : ""}`}
            placeholder=" "
            value={searchInput}
            onChange={handleInputChange}
          />
          <label>검색어를 입력하세요</label>
        </div>
        <button onClick={handleSearch}>검색</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title || "영화 이미지"}
            />
            <h3>{movie.title || movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
