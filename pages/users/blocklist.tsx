import { Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import Config from 'lib/config';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import dayjs from 'dayjs';
import { isEmpty } from 'lib/helpers';
import Pagination from 'components/UI/pagination/Pagination';

export const getServerSideProps: GetStaticProps = async (params: any) => {
	let page;

	if (!params.query) page = 0;
	else {
		if (params?.query?.page) page = params?.query?.page - 1;
	}

	const records = await prisma.blocklist.findMany({
		skip: page ? page * Config.ItemsPerPage : 0,
		take: Config.ItemsPerPage,
	});

	const total = await prisma.blocklist.count({});

	return {
		props: { records: JSON.stringify(records), total },
	};
};

const BlockList = ({ records, total }) => {
	const users_list = JSON.parse(records);

	return (
		<CardWrapper
			label="Blocklist"
			create={{
				link: '/users/blocklist/create',
				label: 'New blocklist',
			}}
		>
			<PageHeader title="Blocklist" />

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
							<tr key={user.id}>
								<td>{user.address} </td>
								<td>{user.note}</td>

								<td>{dayjs(user.created_at).format('DD MMM YYYY')}</td>

								<td className="space-x-5">
									<a className="cursor-pointer text-gray-500 hover:text-gray-100">Remove</a>
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
