import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import Config from 'lib/config';
import { Button, Table } from '@mantine/core';
import Link from 'next/link';
import { isEmpty } from 'lib/helpers';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import Pagination from 'components/UI/pagination/Pagination';
import dayjs from 'dayjs';
import { validateCookie } from 'lib/cookie';
import Heading from 'components/UI/Heading';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const records = await prisma.admins.findMany({
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
		});

		const total = await prisma.admins.count({});

		return {
			props: { records: JSON.stringify(records), total },
		};
	});
};

const Settings = ({ records, total }) => {
	const users = JSON.parse(records);
	const router = useRouter();
	const { loading, response, post } = useRequest({ url: '/api/console/settings/remove_team_member' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Removed team member.');
			router.replace(router.asPath);
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<PageHeader title="Team Members" />

			<Heading
				heading="Team Members"
				sub_heading="Invite a teammate, then control the authentication process together."
			/>

			<div className="space-y-5">
				<div className="grid place-items-end">
					<Link href={'/settings/team/create'} passHref>
						<a className="text-base text-white bg-gray-500 dark:text-gray-100 dark:bg-dark-500 hover:bg-gray-600 px-4 py-2 rounded  dark:hover:text-gray-100 flex items-center">
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

									<td className="space-x-5 flex items-center">
										<Link passHref href={`/settings/team/edit/${record.admin_id}`}>
											<a className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
												<PencilIcon className="w-4 h-4" />
											</a>
										</Link>

										<Button
											size="xs"
											loading={loading}
											variant="subtle"
											onClick={() => post({ id: record.admin_id })}
											className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
										>
											<TrashIcon className="w-4 h-4" />
										</Button>
									</td>
								</tr>
							);
						})}
						{isEmpty(users) && (
							<tr>
								<td colSpan={4}>There are no admin accounts.</td>
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
