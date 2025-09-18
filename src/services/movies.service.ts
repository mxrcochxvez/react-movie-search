import { gql } from "@apollo/client";
import { graphqlService, type GraphQLService } from "./graphql.service";
import { Movie, MoviesQueryResponse } from "./movies.types";

interface GetMoviesOptions {
	page?: number
	perPage?: number
}

export class MoviesService {
	#defaultPage = 1;
	#defaultPerPage = 10;

	#graphqlService: GraphQLService;

	constructor(graphqlService: GraphQLService) {
		this.#graphqlService = graphqlService;
	}

	getPaginatedMovies(options?: GetMoviesOptions): Promise<Movie[]> {
		const { page = this.#defaultPage, perPage = this.#defaultPerPage } = options ?? {};

		return this.#graphqlService.query<MoviesQueryResponse>({
			query: gql`
			query Movies($pagination: PaginationInput) {
				movies(pagination: $pagination) {
					nodes {
						id
						title
						posterUrl
						summary
						duration
						directors
						mainActors
						datePublished
						rating
						ratingValue
						bestRating
						worstRating
						writers
						genres {
							id
							title
						}
					}
				}
			}`,
			variables: {
				pagination: { page, perPage },
			},
		}).then((response) => {
			const { data } = response;

			return data?.movies.nodes ?? [];
		});
	}
}

export const moviesService = new MoviesService(graphqlService);
