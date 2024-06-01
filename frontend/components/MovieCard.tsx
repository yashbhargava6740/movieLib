import React from 'react';
// @ts-ignore
import { useMovieStore } from '../src/zstand/store.js';

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
