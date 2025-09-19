import Link from "next/link";
import { moviesService } from "@movies/services/movies.service";
import Pagination from "@shared/components/pagination";
import GenreFilter from "@shared/components/genre-filter-buttons";
import MovieGrid from "@movies/components/movie-grid";

const buttonStyles =
	"px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors";

interface SearchParams {
	search?: string;
	page?: string;
	genre?: string;
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
	const { search, page, genre } = await searchParams;
	const query = search ?? "";
	const currentPage = Number(page ?? "1");

	const genres = await moviesService.getMovieGenres();
	const movies = await moviesService.getMovies({
		page: currentPage,
		perPage: 10,
		search: query,
		genre,
	});

	const total = movies.length ?? 0;
	const isSearching = Boolean(query);
	const hasResults = movies.length > 0;

	return (
		<div className="p-4">
			{(isSearching || genre) &&
				<Link href="/" className={`${buttonStyles} inline-block my-5`}>
					Go Back
				</Link>
			}

			<h1 className="text-2xl font-bold mb-4">
				{isSearching
					? `Showing ${total} results for '${query}'`
					: genre
						? `Showing ${total} ${genre} movies`
						: "Movies"}
			</h1>

			{isSearching && <GenreFilter genres={genres} activeGenre={genre} query={query} />}

			<Pagination
				currentPage={currentPage}
				total={movies.length}
				perPageCount={10}
				buttonStyles={buttonStyles}
				search={query}
				genre={genre}
			/>

			{hasResults ?
				<MovieGrid movies={movies} /> :
				<p>
					No movies found
					{isSearching ? ` for '${query}'` : genre ? ` in '${genre}'` : ""}.
				</p>
			}
		</div>
	);
}
