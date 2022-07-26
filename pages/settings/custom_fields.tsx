import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import Config from 'lib/config';
import { Badge, Table } from '@mantine/core';
import Link from 'next/link';
import { isEmpty } from 'lib/helpers';
import { PlusIcon } from '@heroicons/react/outline';
import Pagination from 'components/UI/pagination/Pagination';
import { validateCookie } from 'lib/cookie';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const records = await prisma.custom_fields.findMany({
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
		});

		const total = await prisma.custom_fields.count({});

		return {
			props: { records: JSON.stringify(records), total },
		};
	});
};

const Settings = ({ records, total }) => {
	const fields = JSON.parse(records);

	return (
		<SettingsWrapper>
			<PageHeader title="Custom Fields" />

			<div className="space-y-5">
				<div className="grid place-items-end">
					<Link href={'/settings/custom_fields/create'} as={'/settings/custom_fields/create'}>
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
							<th>Name</th>
							<th>Status</th>
							<th>Required</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{fields.map((record) => {
							return (
								<tr key={record.option_id}>
									<td>{record.label}</td>
									<td>{record.name} </td>
									<td>
										<Badge color={record.enabled ? 'green' : 'red'} variant="outline">
											{record.enabled ? 'Enabled' : 'Disabled'}
										</Badge>
									</td>
									<td>{record.required ? 'Yes' : '-'}</td>

									<td className="space-x-5">
										<Link
											as={`/settings/custom_fields/edit/${record.option_id}`}
											href={`/settings/custom_fields/edit/${record.option_id}`}
										>
											<a className="cursor-pointer text-gray-500 hover:text-gray-100">Edit</a>
										</Link>
									</td>
								</tr>
							);
						})}
						{isEmpty(fields) && (
							<tr>
								<td colSpan={5}>There are no records.</td>
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
