import React from 'react';
import FavCard from './FavCard';
// @ts-ignore
import { useMovieStore } from '../src/zstand/store.js';

type Props = {};

export function Favorite({}: Props) {
	const { favorites, fetchFavorites } = useMovieStore();

	React.useEffect(() => {
		fetchFavorites();
	}, []);

	return (
		<div className='w-1/4 h-full rounded-md border bg-white/10  border-gray-800/50'>
			<span className='text-teal-700 font-semibold'>Favorites</span>
			<div className='flex justify-center items-start flex-wrap gap-10'>
				{favorites?.length === 0 ? (
					<span className='text-teal-700 text-3xl font-semibold'>No Favs</span>
				) : (
					favorites?.map((movie: any, index: any) => {
						return <FavCard key={index} movie={movie} />;
					})
				)}
			</div>
		</div>
	);
}
