import Link from 'next/link';

interface PaginationProps {
	currentPage: number;
	total: number;
	perPageCount: number;
	buttonStyles: string;
	search?: string | null;
	genre?: string | null;
}

export default function Pagination({
	currentPage,
	total,
	perPageCount,
	buttonStyles,
	search,
	genre,
}: PaginationProps) {
	const shouldShowNextButton = total === perPageCount;

	const buildHref = (page: number) => {
		const params = new URLSearchParams();
		params.set('page', String(page));

		if (search) params.set('search', search);
		if (genre) params.set('genre', genre);

		return `/?${params.toString()}`;
	};

	return (
		<div className='flex items-center justify-between my-10'>
			{currentPage > 1 ?
				<Link href={buildHref(currentPage - 1)} className={buttonStyles}>
					Previous
				</Link> :
				<div />
			}

			<span className='px-4 py-2 bg-gray-100 rounded-md text-gray-700 font-medium shadow-sm'>
				Page: {currentPage} | Results: {total}
			</span>

			{shouldShowNextButton ?
				<Link href={buildHref(currentPage + 1)} className={buttonStyles}>
					Next
				</Link> :
				<div />
			}
		</div>
	);
}
