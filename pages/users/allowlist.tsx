import { Button, Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import { useRouter } from 'next/router';
import Config from 'lib/config';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import dayjs from 'dayjs';
import { getSettings, isEmpty, whereCondition } from 'lib/helpers';
import Pagination from 'components/UI/pagination/Pagination';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { validateCookie } from 'lib/cookie';
import GatingStatus from 'components/UI/GatingStatus';
import { TrashIcon } from '@heroicons/react/outline';
import AllowlistFilter from 'components/Allowlist/AllowlistFilter';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const where = whereCondition({
			context,
		});

		const records = await prisma.allowlist.findMany({
			where,
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
		});

		const total = await prisma.allowlist.count({});

		const settings = await prisma.settings.findMany({
			where: {
				name: {
					in: ['access_allowlist_only'],
				},
			},
		});

		return {
			props: { records: JSON.stringify(records), total, settings },
		};
	});
};

const Allowlist = ({ records, total, settings }) => {
	const users_list = JSON.parse(records);
	const router = useRouter();
	const setting = getSettings(settings);

	const { loading, response, post } = useRequest({ url: '/api/console/users/remove_allowlist' });
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
			toast.success('Removed from allowlist');
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
			label="Allowlist"
			create={{
				link: '/users/allowlist/create',
				label: 'New allowlist',
			}}
			options={
				<Button
					color="red"
					loading={deleteLoading}
					onClick={() =>
						postRemoveList({
							list_type: 'allowlist',
						})
					}
					className="text-gray-500 flex items-center cursor-pointer hover:text-gray-100"
				>
					<TrashIcon className="w-4 h-4 mr-1" /> <span>Clear list</span>
				</Button>
			}
		>
			<PageHeader title="Allowlist" />

			<div className="px-3 mb-5">
				<AllowlistFilter />
			</div>

			<div className="pl-3 mb-5">
				{setting.access_allowlist_only ? (
					<GatingStatus status={setting.access_allowlist_only} label="Allowlist" />
				) : (
					<GatingStatus status={setting.access_allowlist_only} label="Allowlist" />
				)}
			</div>

			<Table striped highlightOnHover>
				<thead>
					<tr>
						<th>Address</th>
						<th>Label</th>
						<th>Created at</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users_list.map((user) => {
						return (
							<tr key={user.allowlist_id}>
								<td>{user.address}</td>
								<td>{user.label}</td>

								<td>{dayjs(user.created_at).format('DD MMM YYYY')}</td>

								<td className="space-x-5">
									<Button
										size="xs"
										loading={loading}
										variant="subtle"
										onClick={() => removeItem(user.allowlist_id)}
										className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
									>
										Remove
									</Button>
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

export default Allowlist;
