import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown, IoIosCloseCircle } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { baseURLImg, getGenreMovie, searchMovie } from "../../api/movieApi";
import imgNotFound from "../../assets/img/not_found.svg"
import { useSelector } from "react-redux";
import { dataUser, isAuthenticated } from "../../features/auth/authSlice";
import { CgLogOut } from "react-icons/cg";
import { useAuth } from "../../hooks/useAuth";

const Navigation = () => {
    const { handleLogout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAccount, setIsOpenAccount] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [scrollActive, setScrollActive] = useState(false);
    const [dropdownShow, setDropdownShow] = useState(false);
    const [dropdownCategoryMobile, setDropdownCategoryMobile] = useState(false);
    const [dropdownShowProfile, setDropdownShowProfile] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [onFocused, setOnFocused] = useState(false);
    const [category, setCategory] = useState([]);
    const inputRef = useRef(null);
    const dropdownReff = useRef(null);
    const isLoggedIn = useSelector(isAuthenticated)
    const user = useSelector(dataUser)
    const totalWishlist = useSelector((state) => state.wishlist.data?.length || 0);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsOpenSearch(false);
        setIsOpenAccount(false);
    };
    const toggleAccount = () => {
        setIsOpenAccount(!isOpenAccount);
        setIsOpenSearch(false);
        setIsOpen(false);
    };

    const toggleSearch = () => {
        setIsOpenSearch(!isOpenSearch);
        setIsOpen(false);
        setIsOpenAccount(false);
    };

    const handleDropdown = () => {
        setDropdownShow(!dropdownShow);
    }

    const handleDropdownCategoryMobile = () => {
        setDropdownCategoryMobile(!dropdownCategoryMobile);
    }
    const handleDropdownProfile = () => {
        setDropdownShowProfile(!dropdownShowProfile);
    }


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setScrollActive(true);
                // console.log("scroll aktif");
            } else {
                setScrollActive(false);
            }
        })
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setTimeout(() => {
                    setOnFocused(false)
                    setDropdownShow(false)
                    setDropdownShowProfile(false);

                }, 100)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    useEffect(() => {
        getGenreMovie().then((res) => {
            setCategory(res.data.genres)
        })
    }, [])


    // console.log(onFocused);

    const handleSearch = (e) => {
        // console.log(e.target.value.trim());
        const search = e.target.value.trim();
        setKeyword(search);
    }
    const handleOnFocus = () => {
        setOnFocused(true);
    };
    useEffect(() => {
        const delaydebounce = setTimeout(() => {
            if (keyword.length > 0) {
                searchMovie(keyword).then((res) => {
                    const resultSearch = res.data.results.filter((m) => m.original_title.toLowerCase().includes(keyword.toLowerCase()))
                    setResults(resultSearch)
                })
            } else {
                setResults([])
            }
        }, 400)

        return () => clearTimeout(delaydebounce)

    }, [keyword])


    // console.log(scrollActive);





    return (
        <header className={`fixed z-50 w-full flex items-center ${scrollActive ? "bg-primary/80 backdrop-blur shadow-xl " : "bg-transparent"} transisition duration-700 ease-in-out`}>
            <div className="w-full relative md:px-10">
                <div className="flex items-center justify-between">
                    <div className="px-4">
                        <Link to="/" className="font-bold text-lg text-secondary block py-6">MOVIESIK</Link>
                    </div>
                    <div className="w-full flex items-center justify-end lg:justify-center px-4 gap-x-3 text-white">
                        <button className="text-3xl lg:hidden" onClick={toggleSearch}><CiSearch /></button>
                        <button className="font-normal lg:hidden text-white block w-10 h-10 rounded-full bg-[#37383B]" onClick={toggleAccount}>
                            {user.name.substring(0, 1).toUpperCase()}
                        </button>
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="lg:hidden text-4xl w-10 h-10 flex items-center justify-center animate-bounce"
                        >
                            {isOpen ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <span className="absolute w-6 h-0.5 bg-white rotate-45 transition duration-300 ease-in"></span>
                                    <span className="absolute w-6 h-0.5 bg-white -rotate-45 transition duration-300 ease-in"></span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1 w-6 h-6 justify-center items-center">
                                    <span className="w-6 h-0.5 bg-white  transition duration-300 ease-out"></span>
                                    <span className="w-6 h-0.5 bg-white  transition duration-300 ease-out"></span>
                                    <span className="w-6 h-0.5 bg-white  transition duration-300 ease-out"></span>
                                </div>
                            )}
                        </button>
                        <div className="p-4 hidden lg:block">
                            <ul className="flex flex-row relative">
                                <li className="mr-12">
                                    <NavLink to={"/"}
                                        className={({ isActive }) => (
                                            `${isActive ? "text-secondary" : "text-white"} font-normal text-md transition ease-in-out duration-200 hover:text-secondary`
                                        )}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <hr />
                                <hr />
                                <li className="mr-10">
                                    <NavLink to={"/tv-series"}
                                        className={({ isActive }) => (
                                            `${isActive ? "text-secondary" : "text-white"} font-normal text-md transition ease-in-out duration-200 hover:text-secondary`
                                        )}
                                    >
                                        TV Series
                                    </NavLink>
                                </li>
                                <li className="mr-10">
                                    <NavLink to={"/trending"}
                                        className={({ isActive }) => (
                                            `${isActive ? "text-secondary" : "text-white"} font-normal text-md transition ease-in-out duration-200 hover:text-secondary`
                                        )}
                                    >
                                        Trending
                                    </NavLink>
                                </li>
                                <li className="mr-10">
                                    <button className="flex items-center gap-x-1 font-normal text-md text-white hover:text-secondary transition" onClick={handleDropdown}>
                                        Kategori <IoIosArrowDown />
                                    </button>


                                </li>
                                {/* dropdown kategori */}
                                <div
                                    className={`absolute w-[500px] transform -translate-x-1/4 left-1/2  bg-primary p-4 rounded-lg text-white transition-all duration-300 ease-in-out z-10 shadow-2xl
                                                ${dropdownShow ? "top-14 visible opacity-100" : "top-10 invisible opacity-0"}
                                                `}
                                >
                                    <div className="flex flex-wrap gap-y-2">
                                        {category.map((c) => (
                                            <NavLink
                                                to={`/category/${c.name}`}
                                                key={c.id}
                                                className="w-1/4 text-sm hover:text-secondary transition ease-in-out duration-200 "
                                            >
                                                {c.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className=" w-full items-center gap-x-3 justify-end px-2 h-full hidden lg:flex">
                        <form action="" className="w-1/2 flex items-center bg-white/20  py-1 px-2 gap-x-3 rounded-xl relative">
                            <input
                                type="text"
                                className="w-full rounded-md bg-transparent outline-none text-white font-normal text-sm px-4" placeholder="Cari Film Favoritmu..."
                                onFocus={handleOnFocus}
                                onChange={handleSearch}
                                ref={inputRef}
                            />
                            <span className="text-2xl text-white"><CiSearch /></span>


                            <div className={`absolute top-10 left-0 w-full bg-primary rounded-lg transition ease-in-out drop-shadow-2xl ${onFocused ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-white/50 p-4 text-sm">{keyword ? 'Search Result ' + '"' + keyword + '"' : 'Search Movies...'} </p>
                                <hr className="text-white opacity-50" />
                                <div className="flex flex-col overflow-y-auto p-2 gap-2 max-h-[300px] hide-scrollbar">
                                    {results.length > 0 ? (
                                        results.map((m) => (
                                            <Link to={`/detail/${m.id}`} key={m.id}>
                                                <div className="flex items-center gap-3 ">
                                                    <img src={`${baseURLImg}${m.poster_path}`} className="w-12 object-cover object-center rounded-md" alt="" />
                                                    <p className="text-white">{m.original_title}</p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : keyword && (
                                        <div className="flex flex-col items-center justify-center gap-3 mt-5">
                                            <img src={imgNotFound} className="w-20 object-cover object-center rounded-md" />
                                            <p className="text-white/70 text-sm font-semibold w-2/3 text-center">Oops! We couldn’t find that movie in our vault</p>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </form>

                        {!isLoggedIn ? (
                            <>
                                {/* <Link to="/register" className="font-bold text-sm block ">
                                    <button className="font-normal text-white block py-1 px-6 rounded-xl">Register</button>
                                </Link> */}
                                <Link to="/login" className="font-bold text-sm block ">
                                    <button className="font-normal text-white block py-1 px-6 rounded-xl bg-secondary/80">Login</button>
                                </Link>
                            </>
                        ) : (
                            <div ref={dropdownReff}>
                                <button className="font-normal text-white block w-10 h-10 rounded-full bg-[#37383B]" onClick={handleDropdownProfile}>
                                    {user.name.substring(0, 1).toUpperCase()}
                                </button>
                                <div className={`absolute mt-3 right-0 bg-[#38393C]  py-3 w-44 text-white rounded-lg shadow-xl border border-gray-600/50 backdrop-blur-sm ${dropdownShowProfile ? '-translate-x-12' : 'translate-x-full'} transition duration-200 ease-in-out`}>
                                    <div className="flex flex-col text-sm gap-1">
                                        <div className="account-info flex mx-auto flex-col text-center gap-2">
                                            <div className="logo-acoount bg-white/10 w-14 h-14 text-gray-100 rounded-full flex justify-center items-center mx-auto">
                                                {user.name.substring(0, 1).toUpperCase()}
                                            </div>
                                            <div className="info-acoount">
                                                <p className="text-lg">{user.name}</p>
                                                <p className="text-white/50">{user.email}</p>
                                            </div>
                                        </div>
                                        <hr className="border-white/20 mx-2 my-2" />
                                        <div className="menu-dropdown">
                                            <Link className="flex items-center px-3 py-2 mx-1 rounded-md hover:bg-white/10 transition-all duration-200 cursor-pointer group">
                                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                                    Profile
                                                </span>
                                            </Link>
                                            <Link to="/wishlist" className="flex items-center px-3 py-2 mx-1 rounded-md hover:bg-white/10 transition-all duration-200 cursor-pointer group">
                                                <div className="flex items-center w-full justify-between gap-2 group-hover:translate-x-1 transition-transform duration-200">
                                                    <span>Wishlist</span>
                                                    {totalWishlist > 0 && (
                                                        <span className="w-5 h-5 bg-red-600 rounded-full flex justify-center items-center text-sm text-white">
                                                            {totalWishlist}
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>

                                        </div>

                                        <hr className="border-white/20 mx-2 my-2" />

                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 justify-center px-3 py-2 mx-1 rounded-md hover:bg-red-100 hover:text-red-600 transition-all duration-200 group"
                                        >
                                            <CgLogOut className="text-lg group-hover:rotate-12 transition-transform duration-200" />
                                            <span className="group-hover:font-medium transition-all duration-200">
                                                Logout
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>



                </div>



                {/* Seacrh Mobile */}
                <div className={`absolute top-0 left-0 w-full transition-all ease-in-out duration-300 ${isOpenSearch ? 'block' : 'hidden'} z-40`}>
                    <div className="flex flex-col bg-primary h-screen overflow-hidden">
                        <div className="p-4 w-full flex items-center justify-between gap-x-3">
                            <span className="text-3xl text-white"><CiSearch /></span>
                            <input type="text" placeholder="Search..." className="w-full p-2 rounded-md " onChange={handleSearch} />
                            <button className="text-3xl lg:hidden text-white" onClick={toggleSearch}><IoIosCloseCircle /></button>
                        </div>
                        {/* hasil search */}
                        <div className="w-full px-4 ">
                            <hr className="text-white w-full" />
                        </div>
                        <div className="w-full p-4 overflow-y-auto hide-scrollbar gap-y-6 flex-col flex">
                            <p className="text-white">{keyword ? 'Hasil Pencarian ' + keyword : 'Search Movies...'}</p>
                            <div className="w-full flex flex-col gap-y-3">
                                {
                                    results.map((m) => (
                                        <Link onClick={toggleSearch} to={`/detail/${m.id}`} key={m.id}>
                                            <div className="flex items-center gap-x-3">
                                                <img src={`${baseURLImg}${m.poster_path}`} className="w-12 object-cover object-center" alt="" />
                                                <p className="text-white">{m.original_title}</p>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navbar Mobile menu*/}
                <div className={`absolute right-0 w-1/2 lg:hidden  transition duration-500 ease-in-out ${isOpen ? 'translate-x-0 ' : 'translate-x-full'} bg-primary/40 backdrop-blur shadow-xl rounded-lg `}>
                    <div className="flex flex-col text-sm p-6 text-white">
                        <div className="menu-dropdown">
                            <Link className="flex items-center py-2 rounded-md">
                                <span className="">
                                    Popular
                                </span>
                            </Link>
                            <hr />
                            <Link to="/wishlist" className="flex items-center py-2 rounded-md">
                                <div className="flex items-center w-full justify-between gap-2">
                                    <span>TV Series</span>

                                </div>
                            </Link>
                            <hr />

                            <Link to="/wishlist" className="flex items-center py-2">
                                <div className="flex items-center w-full justify-between gap-2">
                                    <span>Trending</span>

                                </div>
                            </Link>
                            <hr />

                            <div className="relative w-full">
                                <button
                                    className="w-full flex items-center justify-between py-2 font-normal text-md text-white"
                                    onClick={handleDropdownCategoryMobile}
                                    aria-expanded={dropdownCategoryMobile}
                                    aria-controls="category-menu"
                                >
                                    Kategori
                                    <IoIosArrowDown
                                        className={`transform transition-transform duration-300 ${dropdownCategoryMobile ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <div
                                    id="category-menu"
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${dropdownCategoryMobile ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {category.map((c) => (
                                            <NavLink
                                                to={`/category/${c.name}`}
                                                key={c.id}
                                                className="w-auto text-sm text-white transition"
                                            >
                                                {c.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <hr />

                        </div>
                    </div>
                </div>
                {/* Navbar Mobile menu account*/}
                <div className={`absolute right-0 w-1/2 lg:hidden  transition duration-500 ease-in-out ${isOpenAccount ? 'translate-x-0 ' : 'translate-x-full'} bg-primary/40 backdrop-blur shadow-xl rounded-lg `}>
                    <div className="flex flex-col text-sm p-6 text-white">
                        <div className="account-info flex mx-auto flex-col text-center gap-2">
                            <div className="logo-acoount bg-white/10 w-14 h-14 text-gray-100 rounded-full flex justify-center items-center mx-auto">
                                {user.name.substring(0, 1).toUpperCase()}
                            </div>
                            <div className="info-acoount">
                                <p className="text-md">{user.name}</p>
                                <p className="text-white/50">{user.email}</p>
                            </div>
                        </div>
                        <hr className="border-white/20 mx-2 my-2" />
                        <div className="menu-dropdown">
                            <Link className="flex items-center py-2 mx-1 rounded-md hover:bg-white/10 transition-all duration-200 cursor-pointer group">
                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                    Profile
                                </span>
                            </Link>
                            <Link to="/wishlist" className="flex items-center py-2 mx-1 rounded-md hover:bg-white/10 transition-all duration-200 cursor-pointer group">
                                <div className="flex items-center w-full justify-between gap-2 group-hover:translate-x-1 transition-transform duration-200">
                                    <span>Wishlist</span>
                                    {totalWishlist > 0 && (
                                        <span className="w-5 h-5 bg-red-600 rounded-full flex justify-center items-center text-sm text-white">
                                            {totalWishlist}
                                        </span>
                                    )}
                                </div>
                            </Link>

                        </div>

                        <hr className="border-white/20 mx-2 my-2" />

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 justify-center py-2 mx-1 bg-red-100 text-red-600 rounded-md"
                        >
                            <CgLogOut className="text-lg group-hover:rotate-12 transition-transform duration-200" />
                            <span className="group-hover:font-medium transition-all duration-200">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Navigation