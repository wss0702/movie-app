// HomeMain.jsx

import React, { useState, useEffect } from 'react';
import './HomeMain.css';
import { PosterGrid } from '../../common/Poster/PosterGrid';
import { Poster } from '../../common/Poster/Poster';
//import { Poster } from '../../common/Poster/Poster';
//import Banner from './Banner/Banner';
//import MovieRow from './MovieRow/MovieRow';
//import URLService from '../../../util/movie/URLService';


function HomeMain() {
  //const [featuredMovie, setFeaturedMovie] = useState(null);
  //const [popularMoviesUrl, setPopularMoviesUrl] = useState('');
  //const [newReleasesUrl, setNewReleasesUrl] = useState('');
  //const [actionMoviesUrl, setActionMoviesUrl] = useState('');
  //const apiKey = localStorage.getItem('TMDb-Key') || '';

/*  useEffect(() => {
    const urlService = new URLService();

    setPopularMoviesUrl(urlService.getURL4PopularMovies(apiKey));
    setNewReleasesUrl(urlService.getURL4ReleaseMovies(apiKey));
    setActionMoviesUrl(urlService.getURL4GenreMovies(apiKey, '28'));

    const loadFeaturedMovie = async () => {
      const movie = await urlService.fetchFeaturedMovie(apiKey);
      setFeaturedMovie(movie);
    };

    loadFeaturedMovie();*/

    /*const scrollListener = () => {
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
  }, [apiKey]);*/
  

  return (
    <div className="home">
      인기영화
     <PosterGrid />

    </div>
  );
}

export default HomeMain;
