import { useParams } from "react-router-dom";
import { baseURLImg } from "../../api/movieApi";
import CardMedium from "../../components/commons/atoms/CardMedium";
import CardSkeleton from "../../components/commons/atoms/CardMedium/skeleton";
import { useMovieByGenre } from "../../hooks/useMovieByGenre";

const PageCategory = () => {
    const { category } = useParams();
   const { movies, loading, setPage, page, skeletonCount, setLoadingMore, loadingMore, error } = useMovieByGenre(category)
    // console.log(category);

    const handleSeeMore = () => {
        if (page < 3) {
            setPage((prev) => prev + 1);
            setLoadingMore(true);
        }
    };


    return (
        <div>
            <div className="w-full py-28 max-w-6xl mx-auto">
                <div className="flex items-center mb-3">
                    <h1 className="text-base md:text-xl font-bold text-white">{category}</h1>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="w-full flex gap-3 flex-wrap">
                    {loading && !error && (
                        Array.from({ length: skeletonCount }).map((_, i) => (
                            <CardSkeleton key={i} />
                        ))
                    )}

                    {!loading && !error &&
                        movies.map((movie) => (
                            <CardMedium key={movie.id} movies={movie} baseUrlImg={baseURLImg} />
                        ))
                    }
                </div>

                {!loading && page < 3 && (
                    <div className="w-full flex justify-center mt-10">
                        {loadingMore ? (
                            <p className="text-white">Loading...</p>
                        ) : (
                            <button
                                className="w-full mt-3 mx-auto text-sm text-stone-400"
                                onClick={handleSeeMore}
                            >
                                See more
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}

export default PageCategory