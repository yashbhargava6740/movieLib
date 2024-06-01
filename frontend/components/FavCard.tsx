import React from 'react';
// @ts-ignore
import { useMovieStore } from '../src/zstand/store.js';
import { handleFavorite } from '../actions/action.js';
// eslint-enable
const FavCard = ({ movie }: any) => {
	const { fetchFavorites } = useMovieStore();
	const [loading, setLoading] = React.useState(false);

	const handleClick = async () => {
		setLoading(true);
		await handleFavorite(movie.imdbID, 'remove')
			.then(() => fetchFavorites())
			.finally(() => setLoading(false));
	};

	return (
		<div key={movie.key} className='group relative flex flex-col gap-2'>
			<img src={movie.Poster} className='rounded max-h-80' alt='' />
			<span>{movie.Title.slice(0, 15)}...</span>
			<span>{movie.Year}</span>
			<button
				onClick={handleClick}
				className=' px-2 py-1 bg-red-800 rounded text-sm font-bold hover:bg-red-700'>
				{loading ? 'Removing...' : 'Remove Fav'}
			</button>
		</div>
	);
};

export default FavCard;
