import { useEffect, useState } from "react"
import { baseURLImg, getMovie } from "../../api/movieApi"
import CardMedium from "../../components/commons/atoms/CardMedium"

const PageTopRated = () => {
    const [moviesTopRated, setMovieTopRated] = useState([])
    useEffect(() => {
        getMovie('top_rated').then(res => {
            const limit = res.data.results.slice(0, 10);
            setMovieTopRated(limit)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleSeeMore = () => {
         getMovie('top_rated').then(res => {
             setMovieTopRated(res.data.results)
         })
    }
    return (
        <div>
              <div className="p-4 w-full pt-28">
                <div className="flex items-center mb-3">
                    <h1 className="text-base md:text-xl font-bold text-white">Top Rated</h1>
                </div>
                <div className="flex gap-x-3 flex-wrap">
                    {
                        moviesTopRated.map((movie, index) => (
                            <CardMedium key={index} movies={movie} baseUrlImg={baseURLImg} />
                        ))
                    }
                </div>
                <button className="w-full mt-3 mx-auto text-sm text-stone-400" onClick={handleSeeMore}>See more</button>
            </div>
        </div>
    )
}

export default PageTopRated