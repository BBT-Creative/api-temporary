export async function genPaginationResult<T>(
	items: T[],
	page: number,
	limit: number,
	itemCount: number,
): Promise<{
	page: number | null;
	total_results: number;
	total_pages: number;
	results: T[];
}> {
	const totalPages = itemCount === 0 ? 0 : itemCount <= limit ? 1 : Math.ceil(itemCount / limit);

	const result = {
		page: page,
		total_pages: totalPages,
		total_results: itemCount,
		results: items,
	};
	return result;
}
