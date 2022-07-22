import { useRouter } from 'next/router';
import { Pagination as PaginationComponent } from '@mantine/core';
import Config from 'lib/config';

const Pagination = ({ total }) => {
	const router = useRouter();

	if (total >= Config.ItemsPerPage) return null;

	return (
		<div className="grid place-items-center mt-5 pb-5">
			<PaginationComponent
				total={Math.ceil(total / Config.ItemsPerPage)}
				onChange={(c) => router.push(`?page=${c}`)}
			/>
		</div>
	);
};

export default Pagination;
