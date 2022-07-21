import { Button, Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import { useRouter } from 'next/router';
import Config from 'lib/config';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import dayjs from 'dayjs';
import { isEmpty } from 'lib/helpers';
import Pagination from 'components/UI/pagination/Pagination';
import { req } from 'lib/request';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const getServerSideProps: GetStaticProps = async (params: any) => {
	let page;

	if (!params.query) page = 0;
	else {
		if (params?.query?.page) page = params?.query?.page - 1;
	}

	const records = await prisma.allowlist.findMany({
		skip: page ? page * Config.ItemsPerPage : 0,
		take: Config.ItemsPerPage,
	});

	const total = await prisma.allowlist.count({});

	return {
		props: { records: JSON.stringify(records), total },
	};
};

const Allowlist = ({ records, total }) => {
	const users_list = JSON.parse(records);
	const router = useRouter();

	const { loading, response, post } = useRequest({ url: '/api/console/users/remove_allowlist' });

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

	return (
		<CardWrapper
			label="Allowlist"
			create={{
				link: '/users/allowlist/create',
				label: 'New allowlist',
			}}
		>
			<PageHeader title="Allowlist" />

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
										className="cursor-pointer text-gray-500 hover:text-gray-100"
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
