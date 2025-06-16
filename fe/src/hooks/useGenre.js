// src/hooks/useGenres.js
import { useState, useEffect } from "react";
import { getGenreMovie } from "../api/movieApi";

export const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [errorGenres, setErrorGenres] = useState(null);

  useEffect(() => {
    getGenreMovie()
      .then((res) => {
        setGenres(res.data.genres);
        setLoadingGenres(false);
      })
      .catch((err) => {
        setErrorGenres("Gagal mengambil genre");
        setLoadingGenres(false);
      });
  }, []);

  return { genres, loadingGenres, errorGenres };
};
