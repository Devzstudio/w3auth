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
import countryFlag from 'data/CountryFlag';
import Logs from 'components/Logs';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const records = await prisma.user_logins.findMany({
			where: {
				user_id: context.query.userId,
			},
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
	const router = useRouter();
	const logs = JSON.parse(records);
	const { loading, response, post } = useRequest({
		url: `/api/console/users/clear_list?user_id=${router.query.userId}`,
	});

	useEffect(() => {
		if (response?.success) {
			toast.success('User logins cleared');
			router.replace(router.asPath);
		}
	}, [response]);

	return (
		<CardWrapper
			label="Sign-in logs"
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
			<PageHeader title="Sign-in logs" />

			<Logs logs={logs} total={total} userRecords={false} hideFilter />
		</CardWrapper>
	);
};

export default LogsActivity;
