import { useEffect, useState } from "react"
import CardList from "../../components/commons/moleculs/CardList"
import { baseURLImg, getMovieTrendingWeek, getTVTrendingWeek } from "../../api/movieApi"
import { useSelector } from "react-redux"
import { isAuthenticated } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

const PageTrending = () => {
    const [movieTrending, setMovieTrending] = useState([])
    const [tvTrending, setTvTrending] = useState([])
    const isLogin = useSelector(isAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLogin){
            navigate("/login")
        }
    }, [isLogin, navigate])

    
    useEffect(() => {
        getMovieTrendingWeek().then(res => {
            const limit = res.data.results.slice(0, 10);
            setMovieTrending(limit)
        }).catch((err) => {
            console.log(err);
        })
    },[])
    useEffect(() => {
        getTVTrendingWeek().then(res => {
            const limit = res.data.results.slice(0, 10);
            setTvTrending(limit)
        }).catch((err) => {
            console.log(err);
        })
    },[])

    if (!isLogin) return null;
    return (
        <div className="md:py-8 md:px-6">
            <div className="p-2 w-full pt-28">
                <div className="p-4 w-full">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">Movie Trending</h1>
                        <p className="text-sm text-stone-400">See all</p>
                    </div>
                    <CardList movies={movieTrending} baseUrlImg={baseURLImg} useBackdrop={true} cardMedium={true} />
                </div>
                <div className="p-4 w-full">
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