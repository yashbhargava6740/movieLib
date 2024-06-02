import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @ts-ignore
import { baseUrl } from '../config/api.js';
import toast from 'react-hot-toast';
import Loader from './Loader.tsx';

interface Playlist {
  id: string;
  playlistName: string;
  imdbIDs: string[];
  visibility: boolean;
}

interface FavCardProps {
  playlist: Playlist;
  onPlaylistClick: (playlistId: string) => void;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const FavCard: React.FC<FavCardProps> = ({ playlist, onPlaylistClick }) => {
  const [showMovies, setShowMovies] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibility, setVisibility] = useState(playlist.visibility);

  const handlePlaylistClick = () => {
    setShowMovies(true);
    onPlaylistClick(playlist.id);
  };

  const handleBackToPlaylists = () => {
    setShowMovies(false);
  };

  const handleVisibilityChange = async (newVisibility: boolean) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/movies/favorites/updateVisibility/${playlist.id}`,
        { visibility: newVisibility },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('user__token')}`,
          },
        }
      );
      setVisibility(newVisibility);
      toast.success(response.data.message); // Display success toast
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast.error('An error occurred while updating visibility.'); // Display error toast
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const moviesData: Movie[] = await Promise.all(
          playlist.imdbIDs.map(async (imdbID) => {
            const response = await axios.get<Movie>(`${baseUrl}/api/movies/search/find/${imdbID}`);
            return response.data;
          })
        );
        setMovies(moviesData);
      } catch (error) {
        setError('Error fetching movie details');
        console.error('Error fetching movie details:', error);
        toast.error('An error occurred while fetching movie details.'); // Display error toast
      } finally {
        setLoading(false);
      }
    };

    if (showMovies) {
      fetchMovieDetails();
    }
  }, [showMovies, playlist.imdbIDs]);

  return (
    <div className="group relative flex flex-col gap-2 p-4 border-b border-gray-700 shadow-lg rounded-lg bg-gray-900 text-white">
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold cursor-pointer hover:text-blue-400" onClick={handlePlaylistClick}>
          {playlist.playlistName}
        </span>
        {showMovies && (
          <button
            onClick={handleBackToPlaylists}
            className="text-sm text-gray-400 hover:text-gray-200"
          >
            Hide
          </button>
        )}
      </div>
      <div className="flex items-center mt-2">
        <label htmlFor={`visibility-toggle-${playlist.id}`} className="flex items-center cursor-pointer">
          <span className="mr-2 text-sm font-medium text-gray-300">{visibility ? 'Public' : 'Private'}</span>
          <div className={`relative w-12 h-6 rounded-full ${visibility ? 'bg-green-500' : 'bg-red-500'}`}>
            <input
              id={`visibility-toggle-${playlist.id}`}
              type="checkbox"
              className="sr-only"
              checked={visibility}
              onChange={() => handleVisibilityChange(!visibility)}
            />
            <div className={`dot absolute left-0 top-0 bg-white w-6 h-6 rounded-full transition-transform ${visibility ? 'transform translate-x-full' : ''}`}></div>
          </div>
        </label>
      </div>
      {showMovies && (
        <div className="mt-4">
          {loading ? (
            <Loader /> // Show loader while loading
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            movies.map((movie, index) => (
              <div key={index} className="flex items-center gap-4 my-2">
                <img src={movie.Poster} alt={`Poster for ${movie.Title}`} className="w-16 h-24 object-cover rounded shadow-md" />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{movie.Title}</span>
                  <span className="text-sm text-gray-400">{movie.Year}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FavCard;
