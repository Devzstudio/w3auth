import { Table } from '@mantine/core';
import CardWrapper from 'components/card/CardWrapper';
import PageHeader from 'components/PageHeader';

const Users = () => {
	return (
		<CardWrapper label="Blocklist">
			<PageHeader title="Blocklist" />

			<Table striped highlightOnHover>
				<thead>
					<tr>
						<th>Address</th>
						<th>Note</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>0x....e1dc</td>
						<td>Jijin blocked</td>
						<td></td>
					</tr>
				</tbody>
			</Table>
		</CardWrapper>
	);
};

export default Users;
