import MovieCard from './movie-card';
import { Movie } from '@/src/services/movies.types';

export default function MovieGrid({ movies }: { movies: Movie[] }) {
	return (
		<div className='grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	);
}
