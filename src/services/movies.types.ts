export interface Genre {
	id: string;
	title?: string;
	movies: Movie[];
}

export interface Movie {
	id: string;
	title: string;
	posterUrl?: string | null;
	summary?: string | null;
	duration?: number | null;
	directors?: string[] | null;
	mainActors?: string[] | null;
	datePublished?: string | null;
	ratingValue?: number | null;
	bestRating?: number | null;
	genres: Genre[];
}

export interface MoviesQueryResponse {
	movies: {
		nodes: Movie[];
	};
}
