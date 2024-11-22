// HomeMain.jsx

import React, { useState, useEffect } from 'react';
import './HomeMain.css';
import { PosterGrid } from '../../common/Poster/PosterGrid';
import Banner from '../main/Banner/Banner';
import Row from '../main/MovieRow/Row';
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
     <Banner />
     <Row
        title="Netflix Originals"
        fetchUrl="/discover/tv?with_networks=213"
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl="/trending/all/week" />
      <Row title="Top Rated" fetchUrl="/movie/top_rated" />
      <Row title="Action Movies" fetchUrl="/discover/movie?with_genres=28" />
      <Row title="Comedy Movies" fetchUrl="/discover/movie?with_genres=35" />
      <Row title="Horror Movies" fetchUrl="/discover/movie?with_genres=27" />
      <Row title="Romance Movies" fetchUrl="/discover/movie?with_genres=10749" />
      <Row title="Documentaries" fetchUrl="/discover/movie?with_genres=99" />

    </div>
  );
}

export default HomeMain;
