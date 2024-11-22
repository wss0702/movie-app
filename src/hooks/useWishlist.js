// src/hooks/useWishlist.js
class WishlistManager {
  constructor() {
    this.key = "movieWishlist"; // Local Storage key
    this.wishlist = JSON.parse(localStorage.getItem(this.key)) || []; // 초기화
  }

  getWishlist() {
    return this.wishlist; // 현재 wishlist 반환
  }

  addToWishlist(movie) {
    const exists = this.wishlist.some((item) => item.id === movie.id);
    if (!exists) {
      this.wishlist.push(movie); // 영화 추가
      this.saveWishlist();
    }
  }

  removeFromWishlist(movieId) {
    this.wishlist = this.wishlist.filter((item) => item.id !== movieId); // 영화 삭제
    this.saveWishlist();
  }

  toggleWishlist(movie) {
    const exists = this.wishlist.some((item) => item.id === movie.id);
    exists ? this.removeFromWishlist(movie.id) : this.addToWishlist(movie); // 토글
  }

  saveWishlist() {
    localStorage.setItem(this.key, JSON.stringify(this.wishlist)); // 로컬 스토리지 저장
  }
}

export default new WishlistManager();
