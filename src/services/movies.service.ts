import { gql } from "@apollo/client";
import { graphqlService, type GraphQLService } from "./graphql.service";

interface GetMoviesOptions {
	page?: number
	perPage?: number
}

export class MoviesService {
	defaultPage = 1;
	defaultPerPage = 10;
	graphqlService: GraphQLService;

	constructor(graphqlService: GraphQLService) {
		this.graphqlService = graphqlService;
	}

	getPaginatedMovies(options?: GetMoviesOptions) {
		const { page = this.defaultPage, perPage = this.defaultPerPage } = options ?? {};

		return graphqlService.query({
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
		});
	}
}

export const moviesService = new MoviesService(graphqlService);
