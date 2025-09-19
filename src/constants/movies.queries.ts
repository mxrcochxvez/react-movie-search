import { gql } from "@apollo/client";

export const MOVIE_FIELDS = gql`
	fragment MovieFields on Movie {
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
`;

export const GENRE_FIELDS = gql`
	fragment GenreFields on Genre {
		title
	}
`;

export const GENRES_QUERY = gql`
	query Genres {
		genres {
			nodes {
				...GenreFields
			}
		}
	}

	${GENRE_FIELDS}
`;

export const MOVIES_QUERY = gql`
	query Movies($pagination: PaginationInput) {
		movies(pagination: $pagination) {
			nodes {
				...MovieFields
			}
		}
	}

	${MOVIE_FIELDS}
`;

export const ALL_MOVIES_QUERY = gql`
	query AllMovies {
		movies {
			nodes {
				...MovieFields
			}
		}
	}

	${MOVIE_FIELDS}
`;
