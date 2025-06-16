import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const baseURL = import.meta.env.VITE_APP_BASEURL;
export const baseURLImg = import.meta.env.VITE_APP_BASEIMGURL
export const bigURLImg = import.meta.env.VITE_APP_BIGIMGURL

export const getMovie = async (movieType) => {
    const movie = await axios.get(`${baseURL}/movie/${movieType}?language=en-US&page=1&api_key=${apiKey}`);
    // console.log(movie);
    return movie
}

export const getGenreMovie = async () => {
    const genreMovies = await axios.get(`${baseURL}/genre/movie/list?language=en-US&api_key=${apiKey}`);
    // console.log(movie);
    return genreMovies
}

export const getMovieDetail = async (id) => {
    const movie = await axios.get(`${baseURL}/movie/${id}?language=en-US&api_key=${apiKey}`);
    // console.log(movie);
    return movie
}

export const getMovieVideoId = async (id) => {
    const movieVideoId = await axios.get(`${baseURL}/movie/${id}/videos?language=en-US&api_key=${apiKey}`)
    return movieVideoId
}
export const searchMovie = async (keyword) => {
    const movie = await axios.get(`${baseURL}/search/movie?language=en-US&query=${keyword}&api_key=${apiKey}`)
    return movie
}

export const getMovieAnimation = async () => {
    const movie = await axios.get(`${baseURL}/discover/movie?with_genres=16&language=en-US&api_key=${apiKey}`)
    return movie
}
export const getMovieAnime = async () => {
    const movie = await axios.get(`${baseURL}/discover/movie?with_genres=16&with_origin_country=JP&language=en-US&sort_by=popularity.desc&api_key=${apiKey}`)
    return movie
}

export const getMovieByGenre = async (genreId, page) => {
    const movie = await axios.get(`${baseURL}/discover/movie?with_genres=${genreId}&page=${page}&language=en-US&api_key=${apiKey}`)
    return movie
}

export const getMovieTrendingWeek = async () => {
    const movie = await axios.get(`${baseURL}/trending/movie/week?language=en-US&api_key=${apiKey}`)
    return movie
}
export const getTVTrendingWeek = async () => {
    const movie = await axios.get(`${baseURL}/trending/tv/week?language=en-US&api_key=${apiKey}`)
    return movie
}

export const getTV = async (tvType) => {
    const movie = await axios.get(`${baseURL}/tv/${tvType}?language=en-US&page=1&api_key=${apiKey}`)
    return movie
}
