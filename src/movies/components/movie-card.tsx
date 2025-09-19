'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Movie } from '../types/movies.types';

export default function MovieCard({ movie }: { movie: Movie }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={`relative bg-black text-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all ${isExpanded ? 'ring-2 ring-indigo-500' : ''}`}
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className="relative w-full h-96">
				<Image
					src={movie.posterUrl || '/placeholder.jpg'}
					alt={movie.title}
					fill
					sizes="
						(max-width: 640px) 100vw,
						(max-width: 1024px) 50vw,
						(max-width: 1280px) 33vw,
						20vw"
					className="object-cover"
				/>
			</div>

			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
				<h2 className="text-xl font-bold drop-shadow-md">{movie.title}</h2>
				<p className="text-xs text-gray-300 italic">
					{isExpanded ? 'Tap to hide details' : 'Tap to view details'}
				</p>
			</div>

			{isExpanded && (
				<div className="absolute inset-0 bg-black/95 p-4 flex flex-col justify-start overflow-y-auto">
					<h2 className="text-xl font-bold mb-2">{movie.title}</h2>
					{movie.summary && <p className="text-sm mb-2">{movie.summary}</p>}

					<div className="mt-2 text-xs text-gray-300 space-y-1">
						{movie.datePublished && (
							<p>
								<span className="font-semibold">Released:</span>{' '}
								{new Date(movie.datePublished).getFullYear()}
							</p>
						)}
						{movie.duration && (
							<p>
								<span className="font-semibold">Duration:</span> {formatDuration(movie.duration)}
							</p>
						)}
						{Array.isArray(movie.directors) && movie.directors.length > 0 && (
							<p>
								<span className="font-semibold">Director:</span>{' '}
								{movie.directors.join(', ')}
							</p>
						)}
						{Array.isArray(movie.mainActors) && movie.mainActors.length > 0 && (
							<p>
								<span className="font-semibold">Stars:</span>{' '}
								{movie.mainActors.join(', ')}
							</p>
						)}
						{movie.genres?.length > 0 && (
							<p>
								<span className="font-semibold">Genres:</span>{' '}
								{movie.genres.map((g) => g.title).filter(Boolean).join(', ')}
							</p>
						)}
						{movie.ratingValue && (
							<p>
								<span className="font-semibold">Rating:</span>{' '}
								{movie.ratingValue}/{movie.bestRating ?? 10}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

function formatDuration(isoDuration: string): string {
	const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
	const matches = isoDuration.match(regex);

	if (!matches) return isoDuration;

	const hours = matches[1] ? `${matches[1]}h` : '';
	const minutes = matches[2] ? `${matches[2]}m` : '';
	const seconds = matches[3] ? `${matches[3]}s` : '';

	return [hours, minutes, seconds].filter(Boolean).join(' ') || isoDuration;
}
