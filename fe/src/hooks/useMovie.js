import { useEffect, useState } from "react";
import { getMovie, getMovieAnimation, getMovieAnime } from "../api/movieApi";

export const useMovie = () => {
  const [moviesPopular, setMoviePopular] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);

  const [moviesTopRated, setMovieTopRated] = useState([]);
  const [loadingTopRated, setLoadingTopRated] = useState(true);

  const [moviesUpcoming, setMovieUpcoming] = useState([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);

  const [moviesNowPlaying, setMovieNowPlaying] = useState([]);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);

  const [moviesAnimation, setMovieAnimation] = useState([]);
  const [loadingAnimation, setLoadingAnimation] = useState(true);

  const [moviesAnime, setMovieAnime] = useState([]);
  const [loadingAnime, setLoadingAnime] = useState(true);

  useEffect(() => {
    getMovie("popular")
      .then((res) => setMoviePopular(res.data.results.slice(0, 10)))
      .catch(console.error)
      .finally(() => setLoadingPopular(false));

    getMovie("top_rated")
      .then((res) => setMovieTopRated(res.data.results.slice(0, 10)))
      .catch(console.error)
      .finally(() => setLoadingTopRated(false));

    getMovie("upcoming")
      .then((res) => setMovieUpcoming(res.data.results))
      .catch(console.error)
      .finally(() => setLoadingUpcoming(false));

    getMovie("now_playing")
      .then((res) => setMovieNowPlaying(res.data.results))
      .catch(console.error)
      .finally(() => setLoadingNowPlaying(false));

    getMovieAnimation()
      .then((res) => setMovieAnimation(res.data.results.slice(0, 20)))
      .catch(console.error)
      .finally(() => setLoadingAnimation(false));

    getMovieAnime()
      .then((res) => setMovieAnime(res.data.results.slice(0, 20)))
      .catch(console.error)
      .finally(() => setLoadingAnime(false));
  }, []);

  return {
    moviesPopular,
    loadingPopular,
    moviesTopRated,
    loadingTopRated,
    moviesUpcoming,
    loadingUpcoming,
    moviesNowPlaying,
    loadingNowPlaying,
    moviesAnimation,
    loadingAnimation,
    moviesAnime,
    loadingAnime,
  };
};
