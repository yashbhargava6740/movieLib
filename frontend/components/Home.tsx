import { Search } from '../components/Search';
import { Movies } from '../components/Movies';
import FavoriteSidebar from './FavoriteSidebar.tsx';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

function Home() {
	const navigate = useNavigate();
	const [text, setText] = useState('');
	const [theme, setTheme] = useState("light");

	const goToPublicPlaylists = () => {
		navigate('/seepublic'); 
	};

    useEffect(() => {
        const userToken = localStorage.getItem('user__token');
        setText(userToken ? 'Logout' : 'Login');
    }, []); 

	const logout = () => {
		localStorage.removeItem('user__token');
		navigate('/login');
	};

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<div className={`z-0 relative w-full min-h-screen flex flex-col justify-center items-center gap-10 ${theme === "dark" ? "bg-gray-900" : "bg-gray-200"}`}>
			<div className='flex w-full justify-between items-center gap-10 p-4'>
				<Search />
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>{text}</button>
				<div className="flex items-center gap-4">
					<button onClick={toggleTheme} className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
						{theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-900" />}
					</button>
					<FavoriteSidebar />
					<button
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
						onClick={goToPublicPlaylists}>
						Public Playlists
					</button>
				</div>
			</div>
			<div className='w-full flex-grow'>
				<Movies />
			</div>
		</div>
	);
}

export default Home;
