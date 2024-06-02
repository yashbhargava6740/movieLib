import React from 'react';
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
  const navigate = useNavigate();

  const handleClick = () => {
    if (localStorage.getItem('user__token') === null) {
      navigate('/login');
      return;
    }
    onShowDialog(movie.imdbID);
  };

  return (
    <div key={movie.key} className="group relative flex flex-col gap-2">
      <img src={movie.Poster} className="rounded max-h-80" alt={movie.Title} />
      <span>{movie.Title.length > 20 ? `${movie.Title.slice(0, 20)}...` : movie.Title}</span>
      <span>{movie.Year}</span>
      <button
        onClick={handleClick}
        className="bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded text-sm font-bold"
      >
        Add to Playlist
      </button>
    </div>
  );
};

export default MovieCard;
