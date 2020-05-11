import axios from 'axios';

let api

api = axios.create({
    baseURL: 'https://api.spotify.com/v1',
});

export default api;
