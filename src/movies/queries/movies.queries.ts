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

export const MOVIES_QUERY = gql`
	query Movies($pagination: PaginationInput, $where: MovieFilterInput) {
		movies(pagination: $pagination, where: $where) {
			nodes {
				...MovieFields
			}
		}
	}

	${MOVIE_FIELDS}
`;

export const GENRES_QUERY = gql`
	query Genres {
		genres {
			nodes {
				title
			}
		}
	}
`;
