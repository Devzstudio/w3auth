import prisma from 'lib/prisma';

import { Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import dayjs from 'dayjs';

import { useRouter } from 'next/router';
import Config from 'lib/config';
import { isEmpty } from 'lib/helpers';
import Pagination from 'components/UI/pagination/Pagination';

export const getServerSideProps: GetStaticProps = async (params: any) => {
	let page;

	if (!params.query) page = 0;
	else {
		if (params?.query?.page) page = params?.query?.page - 1;
	}

	const records = await prisma.users.findMany({
		skip: page ? page * Config.ItemsPerPage : 0,
		take: Config.ItemsPerPage,
	});

	const total = await prisma.users.count({});

	return {
		props: { records: JSON.stringify(records), total },
	};
};

const Users = ({ records, total }) => {
	const users_list = JSON.parse(records);

	return (
		<CardWrapper label="Users">
			<PageHeader title="Users" />

			<Table striped highlightOnHover>
				<thead>
					<tr>
						<th>Address</th>
						<th>Name</th>
						<th>Email</th>
						<th>Created at</th>
						<th>Last Active</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users_list.map((user) => {
						return (
							<tr key={user.id}>
								<td>0x_bug </td>

								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{dayjs(user.created_at).format('DD MMM YYYY')}</td>
								<td>15 July 2022</td>
								<td className="space-x-5">
									<Link as={`/users/logs/${user.id}`} href={`/users/logs/${user.id}`}>
										<a className="cursor-pointer text-gray-500 hover:text-gray-100">Logs</a>
									</Link>

									<Link as={`/users/details/${user.id}`} href={`/users/details/${user.id}`}>
										<a className="cursor-pointer text-gray-500 hover:text-gray-100">Details</a>
									</Link>

									<a className="cursor-pointer text-gray-500 hover:text-gray-100">Block</a>
								</td>
							</tr>
						);
					})}
					{isEmpty(users_list) && (
						<tr>
							<td colSpan={6}>There are no records.</td>
						</tr>
					)}
				</tbody>
			</Table>

			<Pagination total={total} />
		</CardWrapper>
	);
};

export default Users;
