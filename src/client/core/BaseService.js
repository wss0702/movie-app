import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_APP_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_APP_TMDB_BASE_IMAGE_URL;

export class BaseService{
  static async RetrieveApiData(url, method, data) {
    try {
      const response = await axios({
        url: `${BASE_API_URL}${url}`,
        method: method,
        data: data,
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_APP_TMDB_AUTH_TOKEN}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  static GetImageURL(path, size="original"){
    console.log(IMAGE_BASE_URL);
    return `${IMAGE_BASE_URL}${size}${path}`;
  }
}