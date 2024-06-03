import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavCard from './FavCard';
// @ts-ignore
import { baseUrl } from '../config/api.js';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

const FavoriteSidebar: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]); // State to store user's playlists
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null); // State to manage delete loading state

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true); // Set loading state to true
      try {
        const token = localStorage.getItem('user__token');
        if (!token) return;

        const response = await axios.get(`${baseUrl}/api/movies/favorites/playlists`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPlaylists(response.data.playlists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setError('An error occurred while fetching playlists.'); // Set error message
        toast.error('An error occurred while fetching playlists.'); // Display error toast
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (playlistId: string) => {
    console.log('Playlist clicked:', playlistId);
    // Add logic to handle playlist click
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      setDeleteLoading(playlistId); // Set delete loading state
      const token = localStorage.getItem('user__token');
      if (!token) return;

      await axios.delete(`${baseUrl}/api/movies/favorites/deletePlaylist/${playlistId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setPlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== playlistId)
      );

      toast.success('Playlist deleted successfully.');
    } catch (error) {
      console.error('Error deleting playlist:', error);
      toast.error('An error occurred while deleting the playlist.');
    } finally {
      setDeleteLoading(null); // Reset delete loading state
    }
  };

  const handleDeleteMovie = async (playlistId: string, movieId: string): Promise<void> => {
    try {
      const token = localStorage.getItem('user__token');
      if (!token) return;

      await axios.delete(
        `${baseUrl}/api/movies/favorites/deleteMovie`,
        {
          data: { playlistId, movieId },
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, imdbIDs: playlist.imdbIDs.filter((id: string) => id !== movieId) }
            : playlist
        )
      );

      toast.success('Movie deleted successfully.');
    } catch (error) {
      console.error('Error deleting movie:', error);
      toast.error('An error occurred while deleting the movie.');
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="indicator">
          <label
            htmlFor="my-drawer-4"
            className="capitalize drawer-button btn bg-gray-700 text-white"
          >
            See Playlists 💗
          </label>
          <span className="indicator-item badge bg-teal-700 text-white font-bold">
            {playlists.length}
          </span>
        </div>
      </div>
      <div className="drawer-side z-10 min-h-screen">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <span className="text-teal-700 text-2xl font-semibold">
            <span className="text-teal-500">{playlists.length} </span>
            Playlists 💗
          </span>
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <Oval
                height={40}
                width={40}
                color="#4fa94d"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : error ? (
            <span className="text-red-500">{error}</span> // Display error message
          ) : playlists.length > 0 ? (
            playlists.map((playlist: any, index: number) => (
              <li key={index} className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-between">
                {/* Pass playlist and click handler to FavCard component */}
                <FavCard playlist={playlist} onPlaylistClick={handlePlaylistClick} onDeleteMovie={handleDeleteMovie} />
                <button
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  disabled={deleteLoading === playlist.id} // Disable button while loading
                >
                  {deleteLoading === playlist.id ? (
                    <Oval
                      height={20}
                      width={20}
                      color="#4fa94d"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    'Delete'
                  )}
                </button>
              </li>
            ))
          ) : (
            <span>No playlists yet.</span>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FavoriteSidebar;
