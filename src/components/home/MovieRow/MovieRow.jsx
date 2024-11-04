// Banner.jsx

import React from 'react';

function Banner({ movie }) {
  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        {/* 추가 콘텐츠 */}
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
