import { baseURLImg } from "../../api/movieApi"
import CardList from "../../components/commons/moleculs/CardList"
import { useTV } from "../../hooks/useTV"

const PageTVSeries = () => {
    const {airingToday, onTheAir, popular, topRated} = useTV()
    return (
        <div className="md:py-8 md:px-6">
            <div className="p-2 w-full pt-24">
                <h5 className="text-base text-stone-400 px-4">TV Series</h5>
                <hr className="text-stone-400 mx-4 my-4"/>
                <div className="p-4 w-full">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">Airing Today</h1>
                        <p className="text-sm text-stone-400">See all</p>
                    </div>
                    <CardList movies={airingToday} baseUrlImg={baseURLImg} useBackdrop={true} cardMedium={true} />
                </div>
                <div className="p-4 w-full">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">On The Air</h1>
                        <p className="text-sm text-stone-400">See all</p>
                    </div>
                    <CardList movies={onTheAir} baseUrlImg={baseURLImg} useBackdrop={true} cardMedium={true} />
                </div>
                <div className="p-4 w-full">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">Popular</h1>
                        <p className="text-sm text-stone-400">See all</p>
                    </div>
                    <CardList movies={popular} baseUrlImg={baseURLImg} useBackdrop={true} cardMedium={true} />
                </div>
                <div className="p-4 w-full">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">Top Rated</h1>
                        <p className="text-sm text-stone-400">See all</p>
                    </div>
                    <CardList movies={topRated} baseUrlImg={baseURLImg} useBackdrop={true} cardMedium={true} />
                </div>

            </div>

        </div>
    )
}

export default PageTVSeries