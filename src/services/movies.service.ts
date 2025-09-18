import { graphqlService, type GraphQLService } from "./graphql.service";
import { Movie, MoviesQueryResponse } from "./movies.types";
import { MOVIES_QUERY, ALL_MOVIES_QUERY } from "../constants/movies.queries";

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
}

export const moviesService = new MoviesService(graphqlService);
