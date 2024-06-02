import { create } from 'zustand';
import { baseUrl } from '../../config/api.js';
import toast from 'react-hot-toast'; // Import react-hot-toast for displaying toasts

export const useMovieStore = create((set) => ({
  searchResults: [],
  favorites: [],
  isLoading: false, // Add isLoading state for displaying loaders

  setSearchResults: async (results) => {
    set({ searchResults: results });
  },

  fetchFavorites: async () => {
    set({ isLoading: true }); // Show loader while fetching favorites
    try {
      const response = await fetch(`${baseUrl}/api/movies/favorites/all`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('user__token')}`
        }
      });

      if (response.ok) {
        const favorites = await response.json();
        set({ favorites: favorites.data, isLoading: false }); // Hide loader on success
      } else if (response.status === 400) {
        set({ favorites: [], isLoading: false }); // Hide loader on 400 status
        toast.error('Failed to fetch favorites.'); // Display error toast
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('An error occurred while fetching favorites.'); // Display error toast
      set({ isLoading: false }); // Hide loader on error
    }
  },
}));
