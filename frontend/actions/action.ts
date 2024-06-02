import { toast } from 'react-hot-toast';
// @ts-ignore
import { baseUrl } from '../config/api.js';

export const handleFavorite = async (imdbID: string, actionType: string) => {
  const data = {
    imdbID: imdbID,
    actionType: actionType,
  };

  try {
    const response = await fetch(`${baseUrl}/api/movies/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('user__token')}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success('Action completed successfully!');
    } else {
      toast.error(result.error || 'An error occurred.');
    }
  } catch (error) {
    toast.error(error.message || 'Failed to complete the action.');
  }
};
