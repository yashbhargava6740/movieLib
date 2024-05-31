import React from 'react';
import { useMovieStore } from '../src/zstand/store.js';
import FavCard from './FavCard';

export const FavoriteSidebar = () => {
  const { favorites, fetchFavorites } = useMovieStore();
  React.useEffect(() => {
    fetchFavorites();
  }, []);
  return (
    <>
      <div className='drawer drawer-end'>
        <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          <div className='indicator'>
            <label
              htmlFor='my-drawer-4'
              className='capitalize drawer-button btn bg-gray-700 text-white'>
              See Favs 💗
            </label>
            <span className='indicator-item badge bg-teal-700 text-white font-bold'>
              {favorites?.length}
            </span>
          </div>
        </div>
        <div className='drawer-side z-10 min-h-screen '>
          <label
            htmlFor='my-drawer-4'
            aria-label='close sidebar'
            className='drawer-overlay'></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
            <span className='text-teal-700 text-3xl font-semibold'>
              <span className='text-teal-500'>{favorites?.length} </span>
              Favorites 💗
            </span>
            {Array.isArray(favorites) && favorites.length > 0 ? (
              favorites.map((movie, index) => (
                <li key={index}>
                  <FavCard movie={movie} />
                </li>
              ))
            ) : (
              <span>No favorites yet.</span>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
