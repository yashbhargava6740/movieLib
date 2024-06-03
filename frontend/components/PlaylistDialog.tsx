import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner'; // Import the loader component
// @ts-ignore
import { baseUrl } from '../config/api.js';

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
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/movies/favorites/playlists`, {
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
      setLoading(true);
      const token = localStorage.getItem('user__token');
      await axios.post(
        `${baseUrl}/api/movies/favorites/modifyPlaylist`,
        {
          playlistId,
          imdbID: movieId
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Movie added to playlist successfully!');
      window.location.reload();
      onClose();
    } catch (err) {
      // @ts-ignore
      if (err.response && err.response.status === 400 && err.response.data.error === 'Movie already exists in user or playlist.') {
        toast.error('Movie already exists in the playlist.');
      } else {
        setError('Failed to add movie to playlist');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async () => {
    const newPlaylistId = uuidv4();
    try {
      setLoading(true);
      const token = localStorage.getItem('user__token');
      await axios.post(
        `${baseUrl}/api/movies/favorites/createPlaylist`,
        {
          id: newPlaylistId,
          playlistName: newPlaylistName,
          imdbID: movieId
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Playlist created and movie added successfully!');
      window.location.reload();
      onClose();
    } catch (err) {
      // @ts-ignore
      if (err.response && err.response.status === 400 && err.response.data.error === 'Movie already exists in user or playlist.') {
        toast.error('Movie already exists in one of your playlists.');
      } else {
        setError('Failed to create playlist');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          ×
        </button>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Oval
              height={40}
              width={40}
              color="#4fa94d"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
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
