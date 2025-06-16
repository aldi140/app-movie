import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import './index.css';
import MainLayout from './components/layout/main.layout';
import Home from './pages/index.jsx'
import DetailMovie from './pages/Movies/detail.movie.jsx'
import PageTopRated from './pages/TopRated/index.jsx'
import PageNotFound from './pages/404/index.jsx'
import PageCategory from './pages/Category/index.jsx'
import PageTrending from './pages/Trending/index.jsx'
import PageTVSeries from './pages/TVSeries/index.jsx'
import PageLogin from './pages/Auth/login.jsx';
import PageRegister from './pages/Auth/register.jsx';
import { store } from './store/index.js';
import React from 'react';
import { Provider } from 'react-redux';
import Wishlist from './pages/Wishlist/index.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<PageLogin />} />
          <Route path="/register" element={<PageRegister />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/top-rated" element={<PageTopRated />} />
            <Route path="/detail/:id" element={<DetailMovie />} />
            <Route path="/category/:category" element={<PageCategory />} />
            <Route path="/trending" element={<PageTrending />} />
            <Route path="/tv-series" element={<PageTVSeries />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
