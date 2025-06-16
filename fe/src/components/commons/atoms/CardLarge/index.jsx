import { GoStarFill } from "react-icons/go"
import { Link } from "react-router-dom"
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const CardLarge = ({ movies, baseUrlImg, useBackdrop, isLoading}) => {
    if (isLoading) {
        return (
            <div className={`animate-pulse ${useBackdrop === true ? 'md:w-[221px]  w-[144px]' : 'w-[144px] md:w-[220px]'}  rounded-md overflow-hidden`}>
                <div className={`w-full ${useBackdrop === true ? 'h-[150px] md:h-[200px]' : 'h-[216px] md:h-[330px] '} bg-stone-700 rounded-xl mb-2`} />
                <div className="h-4 bg-stone-700 rounded w-3/4" />
            </div>
        );
    }
    const imageUrl = useBackdrop === true ? movies.backdrop_path : movies.poster_path

    return (
        <div>
            <Link to={`/detail/${movies.id}`}>
                
                <div className={` ${useBackdrop ? 'md:w-[214px] sm:w-[144px] w-[190px]' : 'w-[144px] md:w-[220px]'}  flex-shrink-0 rounded-md`}>
                    <div className="w-full relative  overflow-hidden rounded-xl">
                        <img src={`${baseUrlImg}${imageUrl}`} className="w-full object-cover object-center" alt="" />
                        {/* overlay */}
                        <div className="bg-gradient-to-t from-black to-transparent w-full h-full absolute top-0 left-0"></div>
                        <p className="text-white absolute bottom-2 left-2 text-sm flex items-center gap-x-3"><span className="text-secondary"><GoStarFill /></span>{Math.floor(movies.vote_average * 10) / 10}</p>

                    </div>
                    <p className="text-white text-sm mt-2 ">
                        {
                            movies.title.length > 20 ? movies.title.slice(0, 20) + '...' : movies.title
                        }
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default CardLarge