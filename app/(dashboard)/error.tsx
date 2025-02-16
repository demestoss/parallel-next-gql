"use client";

export default function Loading({ error }: { error: Error }) {
	return (
		<div className="p-4">
			<h4>Something went wrong :(</h4>
			<p className="text-red-400">{error.message}</p>
		</div>
	);
}
