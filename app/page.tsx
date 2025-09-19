import Link from "next/link";
import { moviesService } from "@/src/services/movies.service";
import MovieCard from "@/src/components/movie-card";

const buttonStyles = "px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors";

export default async function Home({ searchParams }: { searchParams: Promise<{ search?: string; page?: string; genre?: string }> }) {
	const { search, page, genre } = await searchParams;
	const query = search ?? "";
	const currentPage = Number(page ?? "1");

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

	return (
		<div className="p-4">
			{(query || genre) && (
				<Link href="/" className={`${buttonStyles} inline-block my-5`}>
					Go Back
				</Link>
			)}

			<h1 className="text-2xl font-bold mb-4">
				{query
					? `Showing ${total} results for "${query}"`
					: genre
						? `Showing ${total} ${genre} movies`
						: "Movies"}
			</h1>

			{query && (
				<div className="flex flex-wrap gap-2 mb-6">
					{genres.map((currentGenre) => {
						const params = new URLSearchParams();
						params.set("search", query);
						params.set("genre", currentGenre);

						return (
							<Link
								key={currentGenre}
								href={`/?${params.toString()}`}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${currentGenre === genre
									? "bg-indigo-600 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
									}`}
							>
								{currentGenre}
							</Link>
						);
					})}
				</div>
			)}

			{!query && !genre && (
				<div className="flex items-center justify-between my-10">
					{currentPage > 1 ? (
						<Link href={`/?page=${currentPage - 1}`} className={buttonStyles}>
							Previous
						</Link>
					) : (
						<div />
					)}

					<span className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 font-medium shadow-sm">
						Page {currentPage} - Total Results = {total}
					</span>

					<Link href={`/?page=${currentPage + 1}`} className={buttonStyles}>
						Next
					</Link>
				</div>
			)}

			{movies.length > 0 ? (
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			) : (
				<p>
					No movies found
					{query ? ` for "${query}"` : genre ? ` in "${genre}"` : ""}.
				</p>
			)}
		</div>
	);
}
