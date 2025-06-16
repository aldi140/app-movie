
import { useEffect, useState } from "react";

import Carousel from "../components/Carousel";
import MovieList from "../components/Movie/movie.list";
import { baseURLImg, bigURLImg, getGenreMovie, getMovie } from "../api/movieApi";
import { IoIosArrowUp } from "react-icons/io";


const Home = () => {
    const [moviePopularSLides, setMoviePopularSLides] = useState([])
    const [genreMovies, setGenreMovies] = useState([])
    const [scrollActive, setScrollActive] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                setScrollActive(true);
                // console.log("scroll aktif");
            } else {
                setScrollActive(false);
            }
        })
    }, [])

    useEffect(() => {
        getMovie('popular').then((res) => {
            const limitData = res.data.results.slice(0, 5);
            setMoviePopularSLides(limitData)
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    useEffect(() => {
        getGenreMovie().then((res) => {
            setGenreMovies(res.data.genres)
        }).catch((err) => {
            console.log(err);
        })
        
    }, [])

    const setGenre = (id) => {
        const genre = genreMovies?.find(g => g.id === id)
        return genre.name
    }
    return (
        <div className="relative">
            <Carousel slides={moviePopularSLides} genreMovies={setGenre} baseUrlImg={bigURLImg} />
            <div className="md:py-8 md:px-6">
                <MovieList baseUrlImg={baseURLImg} />
            </div>
            <button className={`fixed bottom-5 right-10 ${scrollActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} w-10 h-10 bg-gray-800 backdrop-blur flex justify-center items-center rounded-full text-2xl text-secondary transition duration-300 ease-in-out`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><IoIosArrowUp /></button>
        </div>
    )
}

export default Home
