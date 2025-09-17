"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
	const [search, setSearch] = useState("");

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		alert(`Searching for: ${search}`);
	};

	return (
		<nav className="bg-black text-white shadow-md px-6 py-4 flex items-center justify-between">
			<Link href="/" className="text-xl font-bold">
				React Movie Search
			</Link>

			<form
				onSubmit={handleSearch}
				className="flex items-center border rounded-lg overflow-hidden"
			>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search..."
					className="px-3 py-2 outline-none w-40 sm:w-64"
				/>
				<button
					type="submit"
					className="bg-white text-black px-4 py-2 hover:bg-gray-200"
				>
					Search
				</button>
			</form>
		</nav>
	);
}
