import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Playlist {
  id: string;
  playlistName: string;
  movies: Movie[];
  visibility: boolean;
  username: string;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const Seepublic: React.FC = () => {
  const [publicPlaylists, setPublicPlaylists] = useState<Playlist[]>([]);
  const apiUrl = 'http://localhost:8000/api/movies/search/playlists';

  useEffect(() => {
    const fetchPublicPlaylists = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          setPublicPlaylists(response.data.playlists);
        }
      } catch (error) {
        console.error('Error fetching public playlists:', error);
      }
    };

    fetchPublicPlaylists();
  }, []);

  const handlePlaylistClick = (playlistId: string) => {
    setPublicPlaylists((prevState) =>
      prevState.map((playlist) =>
        playlist.id === playlistId
    // @ts-ignore
          ? { ...playlist, showMovies: !playlist.showMovies }
          : playlist
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-white">Public Playlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publicPlaylists.map((playlist) => (
          <div key={playlist.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800 text-white shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">{playlist.playlistName}</span>
              <span className="text-sm text-gray-400">by {playlist.username}</span>
            </div>
            <button
              onClick={() => handlePlaylistClick(playlist.id)}
              className="text-blue-400 hover:text-blue-600"
            >
                
              {// @ts-ignore
              playlist.showMovies ? 'Hide Movies' : 'Show Movies'}
            </button>
            {  // @ts-ignore
            playlist.showMovies && (
              <div className="mt-4">
                {playlist.movies.map((movie) => (
                  <div key={movie.imdbID} className="flex items-center gap-4 my-2">
                    <img
                      src={movie.Poster}
                      alt={`Poster for ${movie.Title}`}
                      className="w-16 h-24 object-cover rounded shadow-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">{movie.Title}</span>
                      <span className="text-sm text-gray-400">{movie.Year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seepublic;
