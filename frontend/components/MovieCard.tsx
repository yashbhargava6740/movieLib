import React, { useState } from 'react';
import { useMovieStore } from '../src/zstand/store.js';
import { handleFavorite } from '../actions/action.js';
import { useNavigate } from 'react-router-dom';

interface MovieProps {
  movie: {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
    key: string;
  };
  onShowDialog: (movieId: string) => void;
}

const MovieCard: React.FC<MovieProps> = ({ movie, onShowDialog }) => {
  const { fetchFavorites, favorites } = useMovieStore();
  const [loading, setLoading] = useState(false);
  const isFavorite = favorites.some((item: any) => item.imdbID === movie.imdbID);
  const navigate = useNavigate();

  // To be removed
  const handleClick = async () => {
    if (localStorage.getItem('user__token') === null) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      await handleFavorite(movie.imdbID, isFavorite ? 'remove' : 'add');
      fetchFavorites();
    } finally {
      setLoading(false);
    }
  };

  // To be removed
  const getButtonLabel = () => {
    if (isFavorite) {
      return loading ? 'Removing...' : 'Remove Fav';
    } else {
      return loading ? 'Adding...' : 'Add to Fav';
    }
  };

  return (
    <div key={movie.key} className="group relative flex flex-col gap-2">
      <img src={movie.Poster} className="rounded max-h-80" alt={movie.Title} />
      <span>{movie.Title.slice(0, 20)}...</span>
      <span>{movie.Year}</span>
      
      <button
        onClick={() => onShowDialog(movie.imdbID)}
        className="bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded text-sm font-bold"
      >
        Add to Playlist
      </button>
    </div>
  );
};

export default MovieCard;
