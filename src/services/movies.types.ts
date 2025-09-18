export interface Genre {
	id: string;
	title?: string;
	movies: Movie[];
}

export interface Movie {
	id: string;
	title: string;
	posterUrl: string;
	summary: string;
	duration: number;
	directors: string[];
	mainActors: string[];
	datePublished: string;
	rating: string;
	ratingValue: number;
	bestRating: number;
	worstRating: number;
	writers: string[];
	genres: Genre[];
}

export interface MoviesQueryResponse {
	movies: {
		nodes: Movie[];
	};
}
