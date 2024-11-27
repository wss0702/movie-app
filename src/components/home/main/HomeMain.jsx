// HomeMain.jsx

import React, { useState, useEffect } from 'react';
import './HomeMain.css';
import Banner from '../../../views/home-main/Banner';
import MovieRow from '../../../views/home-main/MovieRow';
import URLService from '../../../util/movie/URLService';

function HomeMain() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMoviesUrl, setPopularMoviesUrl] = useState('');
  const [newReleasesUrl, setNewReleasesUrl] = useState('');
  const [actionMoviesUrl, setActionMoviesUrl] = useState('');
  const apiKey = localStorage.getItem('TMDb-Key') || '';

  useEffect(() => {
    const urlService = new URLService();

    setPopularMoviesUrl(urlService.getURL4PopularMovies(apiKey));
    setNewReleasesUrl(urlService.getURL4ReleaseMovies(apiKey));
    setActionMoviesUrl(urlService.getURL4GenreMovies(apiKey, '28'));

    const loadFeaturedMovie = async () => {
      const movie = await urlService.fetchFeaturedMovie(apiKey);
      setFeaturedMovie(movie);
    };

    loadFeaturedMovie();

    const scrollListener = () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [apiKey]);

  return (
    <div className="home">
      <Banner movie={featuredMovie} />

      <MovieRow title="인기 영화" fetchUrl={popularMoviesUrl} />
      <MovieRow title="최신 영화" fetchUrl={newReleasesUrl} />
      <MovieRow title="액션 영화" fetchUrl={actionMoviesUrl} />
    </div>
  );
}

export default HomeMain;
