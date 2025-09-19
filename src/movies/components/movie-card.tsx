'use client';

import Image from 'next/image';
import { Movie } from '../services/movies.types';

export default function MovieCard({ movie }: { movie: Movie }) {
	return (
		<div className='relative bg-black text-white rounded-lg shadow-lg overflow-hidden group'>
			<div className='relative w-full h-96'>
				<Image
					src={movie.posterUrl || '/placeholder.jpg'}
					alt={movie.title}
					fill
					sizes='
					(max-width: 640px) 100vw,
					(max-width: 1024px) 50vw,
					(max-width: 1280px) 33vw,
					20vw'
					className='object-cover group-hover:opacity-60 transition-opacity'
				/>

			</div>

			<div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-black/40 p-4'>
				<h2 className='text-xl font-bold drop-shadow-md'>{movie.title}</h2>

				{movie.summary && (
					<p className='text-sm text-gray-100 line-clamp-2'>{movie.summary}</p>
				)}

				<div className='mt-2 text-xs text-gray-300 space-y-1'>
					{movie.datePublished && (
						<p>
							<span className='font-semibold'>Released:</span>{' '}
							{new Date(movie.datePublished).getFullYear()}
						</p>
					)}
					{movie.duration && (
						<p>
							<span className='font-semibold'>Duration:</span> {movie.duration} min
						</p>
					)}
					{Array.isArray(movie.directors) && movie.directors.length > 0 && (
						<p>
							<span className='font-semibold'>Director:</span>{' '}
							{movie.directors.join(', ')}
						</p>
					)}
					{Array.isArray(movie.mainActors) && movie.mainActors.length > 0 && (
						<p>
							<span className='font-semibold'>Stars:</span>{' '}
							{movie.mainActors.slice(0, 3).join(', ')}
						</p>
					)}
					{movie.genres?.length > 0 && (
						<p>
							<span className='font-semibold'>Genres:</span>{' '}
							{movie.genres.map((g) => g.title).join(', ')}
						</p>
					)}
					{movie.ratingValue && (
						<p>
							<span className='font-semibold'>Rating:</span>{' '}
							{movie.ratingValue}/{movie.bestRating ?? 10}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
