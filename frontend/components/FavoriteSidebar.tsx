import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import FavCard from './FavCard';
// @ts-ignore
import {baseUrl} from '../config/api.js'
export const FavoriteSidebar: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]); // State to store user's playlists

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem('user__token'); // Get token from localStorage
        if (!token) return; 
        const response = await axios.get(`${baseUrl}/api/movies/favorites/playlists`, {
          headers: {
            authorization: `Bearer ${token}`, 
          },
        });
        setPlaylists(response.data.playlists); 
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlaylists(); 
  }, []);

  // useEffect(() => {
  //   console.log(playlists);
  // }, [playlists]);
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
            See Favs 💗
          </label>
          <span className="indicator-item badge bg-teal-700 text-white font-bold">
            {playlists.length} {/* Display number of playlists */}
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
          {playlists.length > 0 ? (
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
