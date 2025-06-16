
import CardList from "../commons/moleculs/CardList"
import { useMovie } from "../../hooks/useMovie"

const MovieList = ({ baseUrlImg }) => {
   const {
  moviesPopular,
  loadingPopular,
  moviesTopRated,
  loadingTopRated,
  moviesNowPlaying,
  loadingNowPlaying,
  moviesUpcoming,
  loadingUpcoming,
  moviesAnimation,
  loadingAnimation,
  moviesAnime,
  loadingAnime,
} = useMovie();

    return (
        <div className="p-4">
            <div className="w-full bg-gradient-to-tl from-gray-900/20 to-white/20 backdrop-blur-3xl rounded-xl shadow-2xl p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-base md:text-xl font-bold text-white">Most Popular</h1>
                    <p className="text-sm text-stone-400">See all</p>
                </div>
                <CardList movies={moviesPopular} baseUrlImg={baseUrlImg} useBackdrop={false} cardMedium={true} isLoading={loadingPopular} />
            </div>
            
            <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-base md:text-xl font-bold text-white">Top Rated</h1>
                    <p className="text-sm text-stone-400">See all</p>
                </div>
                <CardList movies={moviesTopRated} baseUrlImg={baseUrlImg} useBackdrop={false} cardLarge={true} isLoading={loadingTopRated} />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-base md:text-xl font-bold text-white">Now Playing</h1>
                    <p className="text-sm text-stone-400">See all</p>
                </div>
                <CardList movies={moviesNowPlaying} baseUrlImg={baseUrlImg} useBackdrop={false} cardMedium={true} isLoading={loadingNowPlaying}/>
            </div>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-base md:text-xl font-bold text-white">Upcoming</h1>
                    <p className="text-sm text-stone-400">See all</p>
                </div>
                <CardList movies={moviesUpcoming} baseUrlImg={baseUrlImg} useBackdrop={false} cardMedium={true} isLoading={loadingUpcoming}/>
            </div>

            
            <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-base md:text-xl font-bold text-white">Animation</h1>
                    <p className="text-sm text-stone-400">See all</p>
                </div>
                <CardList movies={moviesAnimation} baseUrlImg={baseUrlImg} useBackdrop={true} cardMedium={true} isLoading={loadingAnimation}/>
            </div>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-base md:text-xl font-bold text-white">Anime</h1>
                    <p className="text-sm text-stone-400">See all</p>
                </div>
                <CardList movies={moviesAnime} baseUrlImg={baseUrlImg} useBackdrop={true} cardMedium={true} isLoading={loadingAnime}/>
            </div>
        </div>
    )
}

export default MovieList