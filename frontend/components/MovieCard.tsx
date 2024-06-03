import React, { useEffect, useState } from 'react';
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
  const [systemTheme, setSystemTheme] = useState('light');

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(darkModeQuery.matches ? 'dark' : 'light');

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    darkModeQuery.addEventListener('change', handleThemeChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  const handleClick = () => {
    if (localStorage.getItem('user__token') === null) {
      navigate('/login');
      return;
    }
    onShowDialog(movie.imdbID);
  };

  return (
    <div key={movie.key} className={`group relative flex flex-col gap-2 ${systemTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <img src={movie.Poster} className="rounded max-h-80" alt={movie.Title} />
      <span>{movie.Title.length > 20 ? `${movie.Title.slice(0, 20)}...` : movie.Title}</span>
      <span>{movie.Year}</span>
      <button
        onClick={handleClick}
        className={`px-2 py-1 rounded text-sm font-bold ${systemTheme === 'dark' ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        Add to Playlist
      </button>
    </div>
  );
};

export default MovieCard;
