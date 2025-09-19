import Link from 'next/link';

interface GenreFilterProps {
	genres: string[];
	activeGenre?: string | null;
	query: string;
}

export default function GenreFilter({ genres, activeGenre, query }: GenreFilterProps) {
	return (
		<div className='flex flex-wrap gap-2 mb-6'>
			{genres.map((currentGenre) => {
				const params = new URLSearchParams();
				params.set('search', query);
				params.set('genre', currentGenre);

				return (
					<Link
						key={currentGenre}
						href={`/?${params.toString()}`}
						className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${currentGenre === activeGenre
							? 'bg-indigo-600 text-white'
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}
					>
						{currentGenre}
					</Link>
				);
			})}

			{activeGenre &&
				<Link
					href={`/?search=${encodeURIComponent(query)}`}
					className='px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors'
				>
					Clear Genre
				</Link>
			}
		</div>
	);
}
