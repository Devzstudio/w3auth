import { Table } from '@mantine/core';
import CardWrapper from 'components/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import Link from 'next/link';

const Users = () => {
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
					<tr>
						<td>0x....e1dc</td>
						<td>Jijin</td>
						<td>jijin@devzstudio.com</td>
						<td>1st July 2022</td>
						<td>15 July 2022</td>
						<td className="space-x-5">
							<Link as="/users/logs/123" href="/users/logs/123">
								<a className="cursor-pointer text-gray-500 hover:text-gray-100">Logs</a>
							</Link>

							<Link as="/users/details/123" href="/users/details/123">
								<a className="cursor-pointer text-gray-500 hover:text-gray-100">Details</a>
							</Link>

							<a className="cursor-pointer text-gray-500 hover:text-gray-100">Block</a>
						</td>
					</tr>
				</tbody>
			</Table>
		</CardWrapper>
	);
};

export default Users;
