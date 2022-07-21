import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import Config from 'lib/config';
import { useRouter } from 'next/router';
import { Table } from '@mantine/core';
import Link from 'next/link';
import { isEmpty } from 'lib/helpers';
import { PlusIcon } from '@heroicons/react/outline';
import Pagination from 'components/UI/pagination/Pagination';
import dayjs from 'dayjs';

export const getServerSideProps: GetStaticProps = async (params: any) => {
	let page;

	if (!params.query) page = 0;
	else {
		if (params?.query?.page) page = params?.query?.page - 1;
	}

	const records = await prisma.admins.findMany({
		skip: page ? page * Config.ItemsPerPage : 0,
		take: Config.ItemsPerPage,
	});

	const total = await prisma.admins.count({});

	return {
		props: { records: JSON.stringify(records), total },
	};
};

const Settings = ({ records, total }) => {
	const users = JSON.parse(records);

	return (
		<SettingsWrapper>
			<PageHeader title="Team Members" />

			<div className="space-y-5">
				<div className="grid place-items-end">
					<Link href={'/settings/team/create'} as={'/settings/team/create'}>
						<a className="text-base bg-dark-700 dark:hover:bg-gray-800 px-4 py-2 rounded dark:text-gray-500 dark:hover:text-gray-100 flex items-center">
							<PlusIcon className="w-4 h-4 mr-2" />
							New Team Member
						</a>
					</Link>
				</div>
				<Table striped highlightOnHover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Address</th>
							<th>Last login</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((record) => {
							return (
								<tr key={record.admin_id}>
									<td>{record.name}</td>
									<td>{record.wallet_address} </td>
									<td>{record.last_login ? dayjs(record.last_login).format('DD MMMM YYYY') : '-'}</td>

									<td className="space-x-5">
										<Link
											as={`/settings/team/edit/${record.admin_id}`}
											href={`/settings/team/edit/${record.admin_id}`}
										>
											<a className="cursor-pointer text-gray-500 hover:text-gray-100">Edit</a>
										</Link>
									</td>
								</tr>
							);
						})}
						{isEmpty(users) && (
							<tr>
								<td colSpan={6}>There are no admin accounts.</td>
							</tr>
						)}
					</tbody>
				</Table>
				<Pagination total={total} />
			</div>
		</SettingsWrapper>
	);
};

export default Settings;
