import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavCard from './FavCard';
// @ts-ignore
import { baseUrl } from '../config/api.js';
import toast from 'react-hot-toast';
import Loader from './Loader.tsx';

const FavoriteSidebar: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]); // State to store user's playlists
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state

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
          <span className="text-teal-700 text-3xl font-semibold">
            <span className="text-teal-500">{playlists.length} </span>
            Playlists 💗
          </span>
          {loading ? (
            <Loader /> // Show loader while fetching playlists
          ) : error ? (
            <span className="text-red-500">{error}</span> // Display error message
          ) : playlists.length > 0 ? (
            playlists.map((playlist: any, index: number) => (
              <li key={index}>
                {/* Pass playlist and click handler to FavCard component */}
                <FavCard playlist={playlist} onPlaylistClick={handlePlaylistClick} />
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
