import Link from 'next/link';

interface PaginationProps {
	currentPage: number;
	total: number;
	buttonStyles: string;
}

export default function Pagination({ currentPage, total, buttonStyles }: PaginationProps) {
	return (
		<div className='flex items-center justify-between my-10'>
			{currentPage > 1 ? (
				<Link href={`/?page=${currentPage - 1}`} className={buttonStyles}>
					Previous
				</Link>
			) : (
				<div />
			)}

			<span className='px-4 py-2 bg-gray-100 rounded-md text-gray-700 font-medium shadow-sm'>
				Page {currentPage} - Total Results = {total}
			</span>

			<Link href={`/?page=${currentPage + 1}`} className={buttonStyles}>
				Next
			</Link>
		</div>
	);
}
