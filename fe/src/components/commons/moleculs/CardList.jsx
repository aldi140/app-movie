import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardLarge from "../atoms/CardLarge";
import CardMedium from "../atoms/CardMedium";
import CardSmall from "../atoms/CardSmall";

const CardList = ({ movies, baseUrlImg, useBackdrop, cardLarge = false, cardMedium = false, cardSmall = false, isLoading = false }) => {
    const [current, setCurrent] = useState(0);
    const ITEMS_PER_PAGE = useBackdrop ? 5 : cardLarge ? 5 : cardMedium ? 7 : 6;
    const isLastPage = current + ITEMS_PER_PAGE >= movies.length;
    const prevSlide = () => {
        setCurrent(current === 0 ? movies.length - 1 : current - ITEMS_PER_PAGE);
    };

    const nextSlide = () => {
        setCurrent(current === movies.length - 1 ? 0 : current + ITEMS_PER_PAGE);
    };
    const backdropWidth = cardMedium ? 221 : 90;
    const cardWidth = useBackdrop ? backdropWidth : cardLarge ? 220 : cardMedium ? 153 : 104
    const gap = 16
    const positionBtnBackdrop = cardLarge ? 'bottom-20' : cardMedium ? 'bottom-[76px]' : 'bottom-10';
    const positionBtnSlide = useBackdrop ? positionBtnBackdrop : cardLarge ? 'bottom-44' : cardMedium ? 'bottom-32' : 'bottom-10';

    if (isLoading) {
        const skeletonCount = ITEMS_PER_PAGE;
        return (
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                {[...Array(skeletonCount)].map((_, index) => (
                    <div key={index}>
                        {cardLarge && (
                            <CardLarge isLoading={true} useBackdrop={useBackdrop} />
                        )}
                        {cardMedium && (
                            <CardMedium isLoading={true} useBackdrop={useBackdrop} />
                        )}
                        {cardSmall && (
                            <CardSmall isLoading={true} useBackdrop={useBackdrop} />
                        )}
                    </div>
                ))}
            </div>
        );
    }


    return (
        <div className="overflow-x-auto w-full hide-scrollbar group relative">
            <div className="flex gap-4 transition ease-in-out duration-1000 "
                style={{ transform: `translateX(-${current * (cardWidth + gap)}px)` }}
            >
                {
                    movies.map((movie, index) => (
                        cardLarge === true ? (
                            <div className="relative z-0" key={index}>
                                {/* <div className="absolute w-full text-center -top-0 text-6xl text-transparent font-extrabold z-20 bg-clip-text bg-gradient-to-t from-black to-transparent rounded-b-full"
                                    style={{
                                        WebkitTextStroke: '2px #fff',
                                    }}>{(index + 1).toString().padStart(2, '0')}
                                </div> */}
                                {/* <div className="absolute top-0 right-2 text-6xl  font-extrabold z-20  rounded-b-full">
                                    <div className="w-[50px] flex flex-col justify-center">
                                        <div className="flex">
                                            <div className="w-full h-[30px] bg-gradient-to-l from-red-600 to-red-900 rounded-bl-xl"></div>
                                            <div className="w-full h-[30px] bg-white"></div>
                                            <div className="w-full h-[30px] bg-gradient-to-r from-red-600 to-red-900 rounded-br-xl"></div>
                                        </div>

                                        <div className="bg-[#E6BE8A]  mx-auto w-[50px] h-[50px] rounded-full flex items-center justify-center ring-2 ring-yellow-800 ring-inset shadow-[inset_0_12px_24px_rgba(0,0,0,0.2)]">
                                            <p className="text-center text-white text-2xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </p>

                                            
                                        </div>
                                    </div>
                                </div> */}

                                <CardLarge
                                    key={index}
                                    index={index}
                                    movies={movie}
                                    baseUrlImg={baseUrlImg}
                                    useBackdrop={useBackdrop}
                                    isLoading={isLoading}
                                />

                            </div>
                        ) : cardMedium === true ? (
                            <CardMedium
                                key={index}
                                movies={movie}
                                baseUrlImg={baseUrlImg}
                                useBackdrop={useBackdrop}
                                isLoading={isLoading}
                            />
                        ) : cardSmall === true ? (
                            <CardSmall
                                key={index}
                                movies={movie}
                                baseUrlImg={baseUrlImg}
                                useBackdrop={useBackdrop}
                                isLoading={isLoading}
                            />
                        ) : null // fallback return
                    ))
                }


            </div>
            {current !== 0 && (
                <div className={`absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden lg:flex ${positionBtnSlide}`}>
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 bg-gray-800 shadow-2xl flex justify-center items-center rounded-full text-2xl text-secondary"
                    >
                        <IoIosArrowBack />
                    </button>
                </div>
            )}
            {!isLastPage && (
                <div className={`absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden lg:flex ${positionBtnSlide}`}>
                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 bg-gray-800 shadow-2xl flex justify-center items-center rounded-full text-2xl text-secondary"
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            )}
        </div>
    )
}

export default CardList