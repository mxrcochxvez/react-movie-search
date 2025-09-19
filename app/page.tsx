import Link from 'next/link';
import { moviesService } from '@movies/services/movies.service';
import Pagination from '@shared/components/pagination';
import GenreFilter from '@shared/components/genre-filter-buttons';
import MovieGrid from '@movies/components/movie-grid';

const buttonStyles = 'px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors';

interface SearchParams {
	search?: string;
	page?: string;
	genre?: string;
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
	const { search, page, genre } = await searchParams;
	const query = search ?? '';
	const currentPage = Number(page ?? '1');

	const genres = await moviesService.getMovieGenres();

	let movies;

	if (query) {
		const searched = await moviesService.searchMovies(query);
		movies = genre
			? await moviesService.filterMoviesByGenre(genre, searched)
			: searched;
	} else {
		movies = await moviesService.getPaginatedMovies({
			page: currentPage,
			perPage: 10,
		});
	}

	const total = movies.length ?? 0;

	const isSearching = Boolean(query);
	const isFilteringByGenre = isSearching && Boolean(genre);
	const isPaginating = !isSearching && !genre;
	const hasResults = movies.length > 0;

	return (
		<div className='p-4'>
			{(isSearching || genre) &&
				<Link href='/' className={`${buttonStyles} inline-block my-5`}>
					Go Back
				</Link>
			}

			<h1 className='text-2xl font-bold mb-4'>
				{isSearching
					? `Showing ${total} results for '${query}'`
					: isFilteringByGenre
						? `Showing ${total} ${genre} movies`
						: 'Movies'}
			</h1>

			{isSearching &&
				<GenreFilter genres={genres} activeGenre={genre} query={query} />
			}

			{isPaginating &&
				<Pagination
					currentPage={currentPage}
					total={total}
					buttonStyles={buttonStyles}
				/>
			}

			{hasResults ?
				<MovieGrid movies={movies} />
				:
				<p>
					No movies found
					{isSearching ? ` for '${query}'` : genre ? ` in '${genre}'` : ''}.
				</p>
			}
		</div>
	);
}
