import { useEffect, useState } from "react"
import CardList from "../../components/commons/moleculs/CardList"
import { baseURLImg, getMovieTrendingWeek, getTVTrendingWeek } from "../../api/movieApi"

const PageTrending = () => {
    const [movieTrending, setMovieTrending] = useState([])
    const [tvTrending, setTvTrending] = useState([])



    useEffect(() => {
        getMovieTrendingWeek().then(res => {
            const limit = res.data.results.slice(0, 10);
            setMovieTrending(limit)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    useEffect(() => {
        getTVTrendingWeek().then(res => {
            const limit = res.data.results.slice(0, 10);
            setTvTrending(limit)
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    return (
        <div className="w-full py-28 px-2">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
                <div className="w-full">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">Movie Trending</h1>
                        <p className="text-sm text-stone-400">See all</p>
                    </div>
                    <CardList movies={movieTrending} baseUrlImg={baseURLImg} useBackdrop={true} cardMedium={true} />
                </div>
                <div className="w-full">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">TV Show Trending</h1>
                        <p className="text-sm text-stone-400">See all</p>
                    </div>
                    <CardList movies={tvTrending} baseUrlImg={baseURLImg} useBackdrop={true} cardMedium={true} />
                </div>

            </div>

        </div>
    )
}


export default PageTrending