import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, getMovieVideoId } from "../../api/movieApi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const DetailMovie = () => {
    const { id } = useParams();
    const baseUrlImg = import.meta.env.VITE_APP_BASEIMGURL
    const [movieId, setMovieId] = useState([])
    const [movieVideoId, setMovieVideoId] = useState({})
    const [isReadMore, setReadMore] = useState(false)
    const overview = movieId?.overview || '';
    const [current, setCurrent] = useState(0);

    const trailersAndClips = movieVideoId?.results?.filter(
        (video) =>
            (video.type === "Trailer" || video.type === "Clip") &&
            video.site === "YouTube"
    ) || [];

    // Fallback jika tidak ada yang official
    const fallbackTrailer = movieVideoId.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    // Final pilihan

    const selectedVideo =
        trailersAndClips || fallbackTrailer || movieVideoId?.results?.[0] || {};
    console.log('ini video yang diambil', selectedVideo);


    useEffect(() => {
        getMovieDetail(id).then(res => setMovieId(res.data)).catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        getMovieVideoId(id).then(res => setMovieVideoId(res.data)).catch(err => console.log(err))
    }, [id])

    const prevSlide = () => {
        setCurrent(current === 0 ? selectedVideo.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === selectedVideo.length - 1 ? 0 : current + 1);
    };

    const handleReadMore = () => setReadMore(!isReadMore)
    console.log(movieId);
    return (
        <div className="">
            <div className="w-full sm:h-[100vh] flex flex-col">
                {/* KOLOM KIRI / ATAS */}
                <div className="w-full h-full flex justify-center items-center relative ">
                    <img
                        src={`${baseUrlImg}${movieId.backdrop_path}`}
                        className="w-full h-full object-cover object-top sm:rounded-b-[200px] brightness-100"
                        alt=""
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-primary bg-opacity-20 sm:rounded-b-[200px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary " />

                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transarent to-transparent " />
                </div>

                {/* KOLOM KANAN / BAWAH */}
                <div className="w-full h-full flex flex-col justify-center items-baseline gap-4 p-4 sm:absolute sm:gap-2 sm:pt-40 px-4">
                    <div className="sm:w-3/4 md:w-1/2 flex flex-col gap-3 mb-2">
                        <h1 className="text-2xl sm:text-4xl font-bold text-white">
                            {movieId.original_title}
                        </h1>
                        <p className="text-sm sm:text-base text-gray-400">
                            {isReadMore ? overview + ' ' : overview.slice(0, 300) + (overview.length > 300 ? ' ... ' : '')}
                            {overview.length > 300 && (
                                <button className="text-sm  text-white" onClick={handleReadMore}>
                                    {isReadMore ? ' Read Less ' : ' Read More '}
                                </button>
                            )}
                        </p>
                    </div>

                    <div className="sm:w-1/2 flex items-center gap-2">
                        <span className="text-sm sm:text-base text-gray-400">
                            Release Date
                        </span>
                        <span className="text-sm sm:text-base text-gray-400">
                            {movieId.release_date}
                        </span>
                    </div>
                    <div className="sm:w-1/2 flex items-center gap-2">
                        <span className="text-sm sm:text-base text-gray-400">
                            Vote Average
                        </span>
                        <span className="text-sm sm:text-base text-gray-400">
                            {movieId.vote_average}
                        </span>
                    </div>
                    <div className="sm:w-1/2 flex items-center gap-2">
                        <span className="text-sm sm:text-base text-gray-400">
                            Vote Count
                        </span>
                        <span className="text-sm sm:text-base text-gray-400">
                            {movieId.vote_count}
                        </span>
                    </div>

                    <div className="flex w-full items-center h-100 gap-x-2">
                        {/* Slider */}
                        <div className="w-full sm:w-1/2 flex h-60 items-center p-5 overflow-hidden">
                            {selectedVideo.map((video, index) => {
                                const isActive = index === current;

                                return (
                                    <div
                                        key={video.key}
                                        className="w-full min-w-[200px] sm:w-1/2 flex-shrink-0 rounded-xl h-52 sm:h-36 shadow-lg  transition-all duration-700 ease-out"
                                        style={{
                                            transform: `translateX(-${current * 100}%) scale(${isActive ? 1.1 : 0.8})`,
                                            opacity: isActive ? 1 : 0.8,
                                        }}
                                    >
                                        <iframe
                                            className="w-full h-full rounded-xl" // HAPUS pointer-events-none di sini
                                            src={`https://www.youtube.com/embed/${video.key}?autoplay=${index === current ? 1 : 0}`}
                                            title={video.name}
                                            allowFullScreen
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="w-1/2 justify-center hidden sm:flex px-4">
                            <div className="w-full flex justify-start gap-x-3">
                                <div className="pointer-events-auto">
                                    <button
                                        onClick={prevSlide}
                                        className="w-10 h-10 bg-white/10 backdrop-blur flex justify-center items-center rounded-full text-2xl text-secondary hover:scale-125 transitionc duration-300 ease-in-out"
                                    >
                                        <IoIosArrowBack />
                                    </button>
                                </div>
                                <div className="pointer-events-auto">
                                    <button
                                        onClick={nextSlide}
                                        className="w-10 h-10 bg-white/10 backdrop-blur flex justify-center items-center rounded-full text-2xl text-secondary hover:scale-125 transitionc duration-300 ease-in-out"
                                    >
                                        <IoIosArrowForward />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Overlay Button Layer */}
                <div className="flex justify-center items-center px-2 pointer-events-none sm:hidden">
                    <div className="w-full flex justify-center gap-2">
                        <div className="pointer-events-auto">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 bg-white/10 backdrop-blur flex justify-center items-center rounded-full text-2xl text-secondary"
                            >
                                <IoIosArrowBack />
                            </button>
                        </div>
                        <div className="pointer-events-auto">
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 bg-white/10 backdrop-blur flex justify-center items-center rounded-full text-2xl text-secondary"
                            >
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                </div>


            </div>
            <div className=""></div>
        </div>


    )
}

export default DetailMovie