import { create } from 'zustand';
import { baseUrl } from '../../config/api.js';

export const useMovieStore = create((set) => ({
  searchResults: [],
  favorites: [],
  setSearchResults: async (results) => {
      set({ searchResults: results });
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
