import { GoStarFill } from "react-icons/go"
import { Link } from "react-router-dom"
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const CardSmall = ({ movies, baseUrlImg, useBackdrop = false }) => {
    const imageUrl = useBackdrop === true ? movies.backdrop_path : movies.poster_path

    return (
        <>
            <Link to={`/detail/${movies.id}`}>
                <div className={` ${useBackdrop ? 'md:w-[160px] sm:w-[144px] w-[190px]' : 'w-[90px] md:w-[104px]'}  flex-shrink-0 rounded-md overflow-hidden`}>
                    <div className="w-full  relative overflow-hidden rounded-xl">
                        <img src={`${baseUrlImg}${imageUrl}`} className="w-full object-cover object-center " alt="" />
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

        </>
    )
}

export default CardSmall