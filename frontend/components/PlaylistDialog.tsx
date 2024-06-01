import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Playlist {
  id: string;
  playlistName: string;
  imdbIDs: string[];
}

interface PlaylistDialogProps {
  movieId: string;
  onClose: () => void;
}

const PlaylistDialog: React.FC<PlaylistDialogProps> = ({ movieId, onClose }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState<string>('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem('user__token');
        const response = await axios.get('http://localhost:8000/api/movies/favorites/playlists', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setPlaylists(response.data.playlists);
      } catch (err) {
        setError('Failed to fetch playlists');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleAddToPlaylist = async (playlistId: string) => {
    try {
      const token = localStorage.getItem('user__token');
      await axios.post(
        'http://localhost:8000/api/movies/favorites/modifyPlaylist',
        {
          playlistId,
          imdbID: movieId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Movie added to playlist successfully!');
      onClose();
    } catch (err) {
      setError('Failed to add movie to playlist');
    }
  };

  const handleCreatePlaylist = async () => {
    const newPlaylistId = uuidv4();
    try {
      const token = localStorage.getItem('user__token');
      await axios.post(
        'http://localhost:8000/api/movies/favorites/createPlayList',
        {
          id: newPlaylistId,
          playlistName: newPlaylistName,
          imdbID: movieId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Playlist created and movie added successfully!');
      onClose();
    } catch (err) {
      setError('Failed to create playlist');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          ×
        </button>
        {loading ? (
          <p className="text-center">Loading playlists...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <ul className="space-y-4 mb-4">
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <button
                    onClick={() => handleAddToPlaylist(playlist.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    {playlist.playlistName}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <input
                type="text"
                placeholder="New Playlist Name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleCreatePlaylist}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Create Playlist
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaylistDialog;