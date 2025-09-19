import { graphqlService, type GraphQLService } from "@shared/services/graphql.service";
import { Genre, GenresQueryResponse, Movie, MoviesQueryResponse } from "../types/movies.types";
import { MOVIES_QUERY, GENRES_QUERY } from "../queries/movies.queries";

interface GetMoviesOptions {
	page?: number;
	perPage?: number;
	search?: string | null;
	genre?: string | null;
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
			query: GENRES_QUERY,
		});

		return this.#extractNodes(data?.genres).map(genre => genre.title) ?? [];
	}

	async getMovies(options?: GetMoviesOptions): Promise<Movie[]> {
		const {
			page = this.#defaultPage,
			perPage = this.#defaultPerPage,
			search = null,
			genre = null,
		} = options ?? {};

		const { data } = await this.#graphqlService.query<MoviesQueryResponse>({
			query: MOVIES_QUERY,
			variables: {
				pagination: { page, perPage },
				where: { search, genre },
			},
		});

		return this.#extractNodes(data?.movies) ?? [];
	}

	#extractNodes<T>(connection?: { nodes?: T[] }): T[] {
		return connection?.nodes ?? [];
	}
}

export const moviesService = new MoviesService(graphqlService);
