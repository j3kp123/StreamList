import axios from 'axios';

const API_KEY = 'c6a6a62323360fcbb26af2f746f6e6a0'; // Replace this with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching data from TMDB API:', error);
        return [];
    }
};
