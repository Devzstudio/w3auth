import { useRouter } from 'next/router';
import { Pagination as PaginationComponent } from '@mantine/core';

const Pagination = ({ total }) => {
	const router = useRouter();

	return (
		<div className="grid place-items-center mt-5 pb-5">
			<PaginationComponent total={total} onChange={(c) => router.push(`?page=${c}`)} />
		</div>
	);
};

export default Pagination;
