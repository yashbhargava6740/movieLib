// import '../src/App.css';
import { Search } from '../components/Search';
import { Movies } from '../components/Movies';
import { FavoriteSidebar } from '../components/FavoriteSidebar';

function Home() {
	return (
		<>
			<div className=' z-0 relative w-full h-full flex flex-col justify-center items-center gap-10'>
				<div className='flex w-full justify-center items-center gap-10'>
					<Search />
					<div>
						<FavoriteSidebar />
					</div>
				</div>
				<div className='w-5/6'>
					<Movies />
				</div>
			</div>
		</>
	);
}

export default Home;
