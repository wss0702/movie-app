// URLService.js

class URLService {
  getURL4PopularMovies(apiKey) {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`;
  }

  getURL4ReleaseMovies(apiKey) {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR`;
  }

  getURL4GenreMovies(apiKey, genreId) {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=ko-KR`;
  }

  async fetchFeaturedMovie(apiKey) {
    const url = this.getURL4PopularMovies(apiKey);
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0]; // 첫 번째 영화를 Featured로 사용
  }
}

export default URLService;
