import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import './MovieWishlist.css';

function MovieWishlist() {
  const gridContainerRef = useRef(null);
  const [rowSize, setRowSize] = useState(4);
  const [moviesPerPage, setMoviesPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentView, setCurrentView] = useState('grid');
  const [visibleWishlistMovies, setVisibleWishlistMovies] = useState([]);
  const [wishlistMovies, setWishlistMovies] = useState([]); // 상태 추가

  const calculateLayout = useCallback(() => {
    if (gridContainerRef.current) {
      const container = gridContainerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = window.innerHeight - container.offsetTop;
      const movieCardWidth = isMobile ? 90 : 220;
      const movieCardHeight = isMobile ? 150 : 330;
      const horizontalGap = isMobile ? 10 : 15;
      const verticalGap = -10;

      const newRowSize = Math.floor(
        containerWidth / (movieCardWidth + horizontalGap)
      );
      const maxRows = Math.floor(
        containerHeight / (movieCardHeight + verticalGap)
      );
      const newMoviesPerPage = newRowSize * maxRows;

      setRowSize(newRowSize);
      setMoviesPerPage(newMoviesPerPage);
    }
  }, [isMobile]);

  const updateVisibleMovies = useCallback(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = wishlistMovies.slice(startIndex, endIndex);

    const groupedMovies = paginatedMovies.reduce(
      (resultArray, item, index) => {
        const groupIndex = Math.floor(index / rowSize);
        if (!resultArray[groupIndex]) {
          resultArray[groupIndex] = [];
        }
        resultArray[groupIndex].push(item);
        return resultArray;
      },
      []
    );

    setVisibleWishlistMovies(groupedMovies);
  }, [currentPage, moviesPerPage, rowSize, wishlistMovies]);

  useEffect(() => {
    updateVisibleMovies();
  }, [updateVisibleMovies]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      calculateLayout();
    };

    window.addEventListener('resize', handleResize);
    calculateLayout();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateLayout]);

  useEffect(() => {
    calculateLayout();
  }, [calculateLayout, wishlistMovies]);

  const getImageUrl = (path) => {
    return path
      ? `https://image.tmdb.org/t/p/w300${path}`
      : '/placeholder-image.jpg';
  };

  const totalPages = Math.ceil(wishlistMovies.length / moviesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="movie-grid" ref={gridContainerRef}>
      <div className={`grid-container ${currentView}`}>
        {visibleWishlistMovies.map((movieGroup, i) => (
          <div
            key={i}
            className={`movie-row ${movieGroup.length === rowSize ? 'full' : ''}`}
          >
            {movieGroup.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => {
                  // 여기에 toggleWishlist 로직을 추가할 수 있음
                }}
              >
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <div className="movie-title">{movie.title}</div>
                <div className="wishlist-indicator">👍</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {wishlistMovies.length === 0 && (
        <div className="empty-wishlist">위시리스트가 비어 있습니다.</div>
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            &lt; 이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            다음 &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieWishlist;
