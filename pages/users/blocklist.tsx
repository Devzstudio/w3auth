import { Button, Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import Config from 'lib/config';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import dayjs from 'dayjs';
import { isEmpty } from 'lib/helpers';
import Pagination from 'components/UI/pagination/Pagination';
import { useRouter } from 'next/router';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { validateCookie } from 'lib/cookie';
import { TrashIcon } from '@heroicons/react/outline';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const records = await prisma.blocklist.findMany({
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
		});

		const total = await prisma.blocklist.count({});

		return {
			props: { records: JSON.stringify(records), total },
		};
	});
};

const BlockList = ({ records, total }) => {
	const users_list = JSON.parse(records);

	const router = useRouter();

	const { loading, response, post } = useRequest({ url: '/api/console/users/remove_blocklist' });
	const {
		loading: deleteLoading,
		response: responseClearList,
		post: postRemoveList,
	} = useRequest({ url: '/api/console/users/clear_list' });

	const removeItem = (id) => {
		post({
			id: id,
		});
	};

	useEffect(() => {
		if (response?.success) {
			toast.success('Removed from blocklist');
			router.replace(router.asPath);
		}
	}, [response]);

	useEffect(() => {
		if (responseClearList?.success) {
			toast.success('Allowlist cleared');
			router.replace(router.asPath);
		}
	}, [responseClearList]);

	return (
		<CardWrapper
			label="Blocklist"
			create={{
				link: '/users/blocklist/create',
				label: 'New blocklist',
			}}
			options={
				<Button
					color="red"
					loading={deleteLoading}
					onClick={() =>
						postRemoveList({
							list_type: 'blocklist',
						})
					}
					className="text-gray-500 flex items-center cursor-pointer hover:text-gray-100"
				>
					<TrashIcon className="w-4 h-4 mr-1" /> <span>Clear list</span>
				</Button>
			}
		>
			<PageHeader title="Blocklist" />

			<Table striped highlightOnHover>
				<thead>
					<tr>
						<th>Address</th>
						<th>Note</th>
						<th>Created at</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users_list.map((user) => {
						return (
							<tr key={user.blocklist_id}>
								<td>{user.address} </td>
								<td>{user.note}</td>

								<td>{dayjs(user.created_at).format('DD MMM YYYY')}</td>

								<td className="space-x-5">
									<Button
										size="xs"
										loading={loading}
										variant="subtle"
										onClick={() => removeItem(user.blocklist_id)}
										className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
									>
										Remove
									</Button>{' '}
								</td>
							</tr>
						);
					})}

					{isEmpty(users_list) && (
						<tr>
							<td colSpan={4}>There are no records.</td>
						</tr>
					)}
				</tbody>
			</Table>
			<Pagination total={total} />
		</CardWrapper>
	);
};

export default BlockList;
