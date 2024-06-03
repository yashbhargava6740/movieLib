import React from 'react';
import useDebounce from '../hooks/Debounce.js';
// @ts-ignore
import { useMovieStore } from '../src/zstand/store.js';
// @ts-ignore
import { baseUrl } from '../config/api.js';

export const Search = () => {
	const movieStore = useMovieStore();

	const [searchTerm, setSearchTerm] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const fetching = async () => {
		if (!debouncedSearchTerm) {
			movieStore.setSearchResults([]);
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const resp = await fetch(
				`${baseUrl}/api/movies/search?query=${debouncedSearchTerm}`
			);
			const results = await resp.json();
			movieStore.setSearchResults(results);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		fetching();
	}, [debouncedSearchTerm]);

	return (
		<form className='w-4/6'>
			<label
				htmlFor='default-search'
				className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
				Search
			</label>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<svg
						className='w-4 h-4 text-gray-500 dark:text-gray-400'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 20 20'>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
						/>
					</svg>
				</div>
				<input
					type='search'
					id='default-search'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='block w-full p-4 pl-10 text-sm outline-none focus:outline-none border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-300 text-white font-bold'
					placeholder='Start typing no need to press enter....'
					required
				/>
			</div>
			{loading && (
				<div className='flex justify-center mt-12'>
					<svg
						className='w-16 h-16 text-blue-500 animate-spin'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8v8H4z'></path>
					</svg>
				</div>
			)}
		</form>
	);
};
