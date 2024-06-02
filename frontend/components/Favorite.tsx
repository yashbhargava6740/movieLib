import React, { useEffect } from 'react';
import FavCard from './FavCard';
import { useMovieStore } from '../src/zstand/store.js';
import toast from 'react-hot-toast';
import Loader from './Loader.tsx';

const Favorite: React.FC = () => {
	const { favorites, fetchFavorites } = useMovieStore();

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetchFavorites();
			} catch (error) {
				console.error('Error fetching favorites:', error);
				toast.error('An error occurred while fetching favorites.'); // Display error toast
			}
		};

		fetchData();
	}, [fetchFavorites]);

	return (
		<div className='w-1/4 h-full rounded-md border bg-white/10 border-gray-800/50'>
			<span className='text-teal-700 font-semibold'>Favorites</span>
			<div className='flex justify-center items-start flex-wrap gap-10'>
				{favorites === null ? (
					<Loader /> // Show loader while fetching favorites
				) : favorites?.length === 0 ? (
					<span className='text-teal-700 text-3xl font-semibold'>No Favs</span>
				) : (
					favorites?.map((movie: any, index: any) => (
						// @ts-ignore
						<FavCard key={index} movie={movie} />
					))
				)}
			</div>
		</div>
	);
};

export default Favorite;
