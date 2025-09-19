import { graphqlService, type GraphQLService } from "./graphql.service";
import { GenresQueryResponse, Movie, MoviesQueryResponse } from "./movies.types";
import { MOVIES_QUERY, ALL_MOVIES_QUERY, GENRES_QUERY } from "../constants/movies.queries";

interface GetMoviesOptions {
	page?: number;
	perPage?: number;
}

export class MoviesService {
	#defaultPage = 1;
	#defaultPerPage = 10;
	#graphqlService: GraphQLService;

	constructor(graphqlService: GraphQLService) {
		this.#graphqlService = graphqlService;
	}

	async getMovieGenres(): Promise<string[]> {
		const { data } = await this.#graphqlService.query<GenresQueryResponse>({
			query: GENRES_QUERY
		});

		if (!data) return [];

		const genres = data.genres.nodes;

		return genres.map(genre => genre.title);
	}

	async getPaginatedMovies(options?: GetMoviesOptions): Promise<Movie[]> {
		const { page = this.#defaultPage, perPage = this.#defaultPerPage } = options ?? {};

		const { data } = await this.#graphqlService.query<MoviesQueryResponse>({
			query: MOVIES_QUERY,
			variables: { pagination: { page, perPage } },
		});

		return data?.movies.nodes ?? [];
	}

	async getAllMovies(): Promise<Movie[]> {
		const { data } = await this.#graphqlService.query<MoviesQueryResponse>({ query: ALL_MOVIES_QUERY });

		return data?.movies.nodes ?? [];
	}

	async searchMovies(term: string): Promise<Movie[]> {
		const allMovies = await this.getAllMovies();

		if (!term.trim()) return allMovies;

		const lowerCaseTerm = term.toLowerCase();

		return allMovies.filter((movie) => {
			const matchesTitle = movie.title.toLowerCase().includes(lowerCaseTerm);

			const matchesSummary =
				movie.summary?.toLowerCase().includes(lowerCaseTerm) ?? false;

			const matchesDirectors =
				movie.directors?.some((director) =>
					director.toLowerCase().includes(lowerCaseTerm)
				) ?? false;

			const matchesActors =
				movie.mainActors?.some((actor) =>
					actor.toLowerCase().includes(lowerCaseTerm)
				) ?? false;

			const matchesGenres =
				movie.genres?.some(
					(genre) => genre?.title?.toLowerCase().includes(lowerCaseTerm) ?? false
				) ?? false;

			return (
				matchesTitle ||
				matchesSummary ||
				matchesDirectors ||
				matchesActors ||
				matchesGenres
			);
		});
	}

}

export const moviesService = new MoviesService(graphqlService);
