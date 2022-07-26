import { Button, Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import dayjs from 'dayjs';
import Config from 'lib/config';
import { isEmpty } from 'lib/helpers';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import Pagination from 'components/UI/pagination/Pagination';
import { validateCookie } from 'lib/cookie';
import BrowserIcon from 'components/UI/BrowserIcon';
import { TrashIcon } from '@heroicons/react/outline';
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

		const records = await prisma.user_logins.findMany({
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
		});

		const total = await prisma.user_logins.count({});

		return {
			props: { records: JSON.stringify(records), total },
		};
	});
};

const LogsActivity = ({ records, total }) => {
	const logs = JSON.parse(records);
	const { loading, response, post } = useRequest({ url: '/api/console/users/clear_list' });
	const router = useRouter();

	useEffect(() => {
		if (response?.success) {
			toast.success('User logins cleared');
			router.replace(router.asPath);
		}
	}, [response]);

	return (
		<CardWrapper
			label="Login logs"
			options={
				<Button
					color="red"
					loading={loading}
					onClick={() =>
						post({
							list_type: 'user_logs',
							user_id: router.query.userId,
						})
					}
					className="text-gray-500 flex items-center cursor-pointer hover:text-gray-100"
				>
					<TrashIcon className="w-4 h-4 mr-1" /> <span>Clear list</span>
				</Button>
			}
		>
			<PageHeader title="Login logs" />

			<Table className="mt-5" striped highlightOnHover>
				<thead>
					<tr>
						<th>Browser</th>
						<th>IP</th>
						<th>Country</th>
						<th>Created at</th>
					</tr>
				</thead>
				<tbody>
					{logs.map((record) => {
						return (
							<tr key={record.id}>
								<td>
									<BrowserIcon name={record.browser} />
								</td>
								<td>{record.ip} </td>
								<td>{record.country} </td>
								<td>{dayjs(record.created_at).format('DD MMM YYYY')}</td>
							</tr>
						);
					})}

					{isEmpty(logs) && (
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

export default LogsActivity;
