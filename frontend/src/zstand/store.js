import { create } from 'zustand';
import { baseUrl } from '../../config/api.js';

export const useMovieStore = create((set) => ({
  searchResults: [],
  favorites: [],
  setSearchResults: async (results) => {
    if (results.length === 0) {
      // Fetch playlists if search results are empty
      // console.log("Yes");
      try {
        const response = await fetch(`${baseUrl}/api/movies/search/playlists`, {
          method: 'GET',
        });
        if (response.ok) {
          const { playlists } = await response.json();
          console.log(playlists);
          set({ searchResults: playlists[0].movies }); // Set search results to fetched playlists
        } else {
          console.error('Error fetching playlists:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    } else {
      // Set search results if not empty
      set({ searchResults: results });
    }
  },
  fetchFavorites: async () => {
    try {
      const response = await fetch(`${baseUrl}/api/movies/favorites/all`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('user__token')}`
        }
      });

      if (response.ok) {
        const favorites = await response.json();
        set({ favorites: favorites.data });  // Correctly setting the favorites state
      } else if (response.status === 400) {
        set({ favorites: [] });  // Correctly handling the 400 status
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  },
}));
