import { useState, useEffect } from "react";
import { getMovieByGenre } from "../api/movieApi";
import { useGenres } from "./useGenre";

export const useMovieByGenre = (category) => {
  const [genreId, setGenreId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [skeletonCount, setSkeletonCount] = useState(0);
  const {genres} = useGenres();

  useEffect(() => {
    if (!category || genres.length === 0) return;

    const genre = genres.find((g) => g.name === category);
    if (!genre) {
      setError("Genre tidak ditemukan");
      setMovies([]);
      return;
    }
    setGenreId(genre.id);
    setPage(1);
  }, [category, genres]);

  useEffect(() => {
    if (!genreId) return;
    setLoading(true);
    getMovieByGenre(genreId, page)
      .then((res) => {
        const newMovies = res.data.results;
        if (page === 1) {
          setMovies(newMovies);
        } else {
          setMovies((prev) => [...prev, ...newMovies]);
        }
        setSkeletonCount(newMovies.length);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Gagal mengambil data film");
        setLoading(false);
      });
  }, [genreId, page]);

  return {
    movies,
    loading,
    loadingMore,
    error,
    setPage,
    page,
    setLoadingMore,
    skeletonCount,
  };
};
