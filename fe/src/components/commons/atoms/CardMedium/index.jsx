import { GoStarFill } from "react-icons/go";
import { Link } from "react-router-dom";

const CardMedium = ({ movies, baseUrlImg, useBackdrop = false, isLoading}) => {
    // console.log(isLoading);
    if (isLoading) {
        return (
            <div className={`animate-pulse ${useBackdrop ? 'md:w-[221px] w-[144px]' : 'w-[112px] md:w-[153px]'} flex-shrink-0 rounded-md overflow-hidden`}>
                <div className="w-full h-[200px] bg-stone-700 rounded-xl mb-2" />
                <div className="h-4 bg-stone-700 rounded w-3/4" />
            </div>
        );
    }

    const imageUrl = useBackdrop ? movies.backdrop_path : movies.poster_path;
    const title = movies.title || movies.original_name;

    return (
        <Link to={`/detail/${movies.id}`}>
            <div className={`${useBackdrop ? 'md:w-[221px] w-[144px]' : 'w-[112px] md:w-[153px]'} flex-shrink-0 rounded-md overflow-hidden`}>
                <div className="w-full relative overflow-hidden rounded-xl">
                    <img src={`${baseUrlImg}${imageUrl}`} className="w-full object-cover object-center" alt={title} />
                    {/* overlay */}
                    <div className="bg-gradient-to-t from-black to-transparent w-full h-full absolute top-0 left-0" />
                    <p className="text-white absolute bottom-2 left-2 text-sm flex items-center gap-x-3">
                        <span className="text-secondary"><GoStarFill /></span>
                        {Math.floor(movies.vote_average * 10) / 10}
                    </p>
                </div>
                <p className="text-white text-sm mt-2">
                    {title.length > 20 ? title.slice(0, 20) + '...' : title}
                </p>
            </div>
        </Link>
    );
};

export default CardMedium;
