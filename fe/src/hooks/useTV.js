import { useEffect, useState } from "react"
import { getTV } from "../api/movieApi"

export const useTV = () => {
     const [airingToday, setAiringToday] = useState([])
    const [onTheAir, setOnTheAir] = useState([])
    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        getTV('airing_today').then(res => {
            setAiringToday(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    useEffect(() => {
        getTV('on_the_air').then(res => {
            setOnTheAir(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    useEffect(() => {
        getTV('popular').then(res => {
            setPopular(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    useEffect(() => {
        getTV('top_rated').then(res => {
            setTopRated(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

   return {airingToday, onTheAir, popular, topRated}
}