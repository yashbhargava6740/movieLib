import { create } from 'zustand';
import { baseUrl } from '../../config/api.js';
export const useMovieStore = create((set) => ({
	searchResults: [],
	favorites: [],
	setSearchResults: (results) => set({ searchResults: results }),
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
				set({ favorites });
			} else if (response.status == 400) {
				set({ favorites: [] });
			}
		} catch (error) {
			console.error('Error fetching favorites:', error);
		}
	},
}));
