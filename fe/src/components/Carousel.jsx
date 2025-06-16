import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCirclePlay } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";

export default function Carousel({ slides, genreMovies, baseUrlImg }) {

  const [current, setCurrent] = useState(0);
  const {handleAddToWislist} = useWishlist();
  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3000); 

    return () => clearTimeout(timer); // bersihkan timeout saat komponen re-render
  }, [current]); // hanya berjalan saat current berubah

 

  // console.log(slides);
  return (
    <div className="overflow-hidden relative">
      {/* Slider Container */}
      <div
        className={`flex w-full transition ease-out duration-1000 h-[50vh] sm:h-[80vh]`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, index) => (
          <div key={index} className="w-full h-full relative flex-shrink-0">
            {/* Background Image */}
            <img
              className="w-full h-full object-cover object-center"
              src={`${baseUrlImg}${s.backdrop_path ? s.backdrop_path : s.poster_path}`}
              alt={`slide-${index}`}
            />

            {/* Semi-transparent Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-10" />

            {/* Text + Buttons */}
            <div className="absolute bottom-0 left-0 w-full sm:w-3/4 md:w-1/2 h-full bg-gradient-to-r from-black text-white items-center pt-28 px-10 sm:pt-48 sm:pl-20 sm:pr-0 z-20">
              <div className="w-full flex flex-row gap-x-4 mb-3">
                <div className="flex gap-x-2">
                  <span className="text-yellow-400 flex items-center">
                    <GoStarFill />
                  </span>
                  <p className="text-white opacity-70">{Math.floor(s.vote_average * 10) / 10}</p>
                  <p className="text-white opacity-70">{s.release_date.substring(0, 4)}</p>
                </div>
                <p className="text-white opacity-70">• {genreMovies(s.genre_ids?.[0])}</p>
              </div>

              <div className="w-full h-[80px] sm:h-[140px]">
                <h1 className="text-2xl text-secondary font-bold">{s.original_title}</h1>
                <p className="text-white w-full opacity-70 hidden sm:block">
                  {s.overview.length > 250 ? s.overview.slice(0, 250) + "..." : s.overview}</p>
              </div>


              <div className="flex flex-row gap-x-4 mt-5 w-full">
                <Link to={`/detail/${s.id}`} className="bg-primary/80 backdrop-blur px-4 py-[10px]  rounded-xl hover:shadow-md hover:text-white hover:scale-110 flex items-center gap-x-3 justify-center transition ease-in-out duration-500 text-sm font-bold">
                  <span className="text-secondary text-xl"><FaCirclePlay /></span> Watch Trailer
                </Link>
                <button type="button" className="bg-primary/80 backdrop-blur px-4 py-[10px]  rounded-xl hover:shadow-md hover:text-white hover:scale-110 flex items-center gap-x-2 justify-center transition ease-in-out duration-500 text-sm font-bold outline outline-[0.5px] outline-secondary" onClick={() => handleAddToWislist(s)}>
                  <span className="text-secondary text-xl" ><AiFillPlusCircle /></span> Wishlist
                </button>
                {/* <button className="outline outline-1 outline-secondary px-3 py-4 rounded-2xl hover:bg-secondary hover:text-white">
                  Watch Trailer
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Navigation Buttons */}
      <button onClick={prevSlide} className="absolute top-0 left-0 flex items-center justify-center w-10 h-full text-secondary text-3xl">
        <IoIosArrowBack />
      </button>
      <button onClick={nextSlide} className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-secondary  text-3xl">
        <IoIosArrowForward />
      </button>
    </div>
  );

}

