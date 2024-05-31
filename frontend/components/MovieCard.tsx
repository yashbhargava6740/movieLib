import React from 'react';
import { useMovieStore } from '../src/zstand/store.js';
import { handleFavorite } from '../actions/action.js';

const MovieCard = ({ movie }: any) => {
  const { fetchFavorites, favorites } = useMovieStore();
  const [loading, setLoading] = React.useState(false);

  const isFavorite = Array.isArray(favorites) && favorites.some((item: any) => item.imdbID === movie.imdbID);

  const handleClick = async () => {
    setLoading(true);

    await handleFavorite(movie.imdbID, isFavorite ? 'remove' : 'add')
      .then(() => fetchFavorites())
      .finally(() => setLoading(false));
  };

  const getButtonLabel = () => {
    if (isFavorite) {
      return loading ? 'Removing...' : 'Remove Fav';
    } else {
      return loading ? 'Adding...' : 'Add to Fav';
    }
  };

  return (
    <div key={movie.key} className='group relative flex flex-col gap-2'>
      <img src={movie.Poster} className='rounded max-h-80' alt='' />
      <span>{movie.Title.slice(0, 20)}...</span>
      <span>{movie.Year}</span>
      <button
        onClick={handleClick}
        className={`${
          isFavorite ? 'bg-red-800 hover:bg-red-700' : 'bg-teal-800 hover:bg-teal-700'
        } px-2 py-1  rounded text-sm font-bold`}>
        {getButtonLabel()}
      </button>
    </div>
  );
};

export default MovieCard;
