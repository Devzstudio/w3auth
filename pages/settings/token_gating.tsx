import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import Config from 'lib/config';
import { Table } from '@mantine/core';
import Link from 'next/link';
import { getSettings, isEmpty } from 'lib/helpers';
import { PlusIcon } from '@heroicons/react/outline';
import Pagination from 'components/UI/pagination/Pagination';
import { validateCookie } from 'lib/cookie';
import Heading from 'components/UI/Heading';
import GatingStatus from 'components/UI/GatingStatus';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const settings = await prisma.settings.findMany({
			where: {
				name: {
					in: ['enable_token_gating'],
				},
			},
		});

		const records = await prisma.token_gating.findMany({
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
		});

		const total = await prisma.token_gating.count({});

		return {
			props: { records: JSON.stringify(records), total, settings },
		};
	});
};

const Settings = ({ records, total, settings }) => {
	const fields = JSON.parse(records);
	const setting = getSettings(settings);

	return (
		<SettingsWrapper>
			<PageHeader title="Token Gating" />

			<Heading
				heading="Token Gating"
				sub_heading="Users that have the token in their wallets can log in. You can define the minimum number of tokens."
			/>

			{setting.enable_token_gating ? (
				<GatingStatus status={setting.enable_token_gating} label="Token Gating" />
			) : (
				<GatingStatus status={setting.enable_token_gating} label="Token Gating" />
			)}

			<div className="space-y-5">
				<div className="grid place-items-end">
					<Link href={'/settings/token_gating/create'} as={'/settings/token_gating/create'}>
						<a className="text-base bg-dark-700 dark:hover:bg-gray-800 px-4 py-2 rounded dark:text-gray-500 dark:hover:text-gray-100 flex items-center">
							<PlusIcon className="w-4 h-4 mr-2" />
							New Field
						</a>
					</Link>
				</div>
				<Table striped highlightOnHover>
					<thead>
						<tr>
							<th>Label</th>
							<th>Contract Address</th>
							<th>Chain</th>
							<th>Value</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{fields.map((record) => {
							return (
								<tr key={record.id}>
									<td>{record.label}</td>
									<td>{record.contract_address}</td>
									<td>{record.chain} </td>
									<td>{record.value}</td>

									<td className="space-x-5">
										<Link
											as={`/settings/token_gating/edit/${record.id}`}
											href={`/settings/token_gating/edit/${record.id}`}
										>
											<a className="cursor-pointer text-gray-500 hover:text-gray-100">Edit</a>
										</Link>
									</td>
								</tr>
							);
						})}
						{isEmpty(fields) && (
							<tr>
								<td colSpan={6}>There are no records.</td>
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
