import React from "react";
import "./Poster.css";
import { BaseService } from "../../../client"; // BaseService를 import

const Poster = ({ data, error }) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!data || !data.poster_path) {
    return <div className="poster-placeholder">포스터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="poster-card">
      <img
        className="poster-image"
        src={BaseService.GetImageURL(data.poster_path, "w500")} // BaseService.GetImageURL을 사용
        alt={data.title || "영화 이미지"}
      />
      <div className="poster-title">{data.title || data.name}</div>
    </div>
  );
};

export default Poster;
