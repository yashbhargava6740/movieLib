// @ts-ignore
import { baseUrl } from '../config/api.js';

export const handleFavorite = async (imdbID: string, actionType: string) => {
	const data = {
		imdbID: imdbID,
		actionType: actionType,
	};
	// console.log(data);
	await fetch(`${baseUrl}/api/movies/favorites`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'authorization': `Bearer ${localStorage.getItem('user__token')}`,
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			alert(error.message);
		});
};
