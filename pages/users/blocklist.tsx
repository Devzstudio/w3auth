import { Table } from '@mantine/core';
import CardWrapper from 'components/card/CardWrapper';

const Users = () => {
	return (
		<CardWrapper label="Blocklist">
			<Table striped highlightOnHover>
				<thead>
					<tr>
						<th>Address</th>
						<th>Name</th>
						<th>Email</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>0x....e1dc</td>
						<td>Jijin</td>
						<td>jijin@devzstudio.com</td>
						<td></td>
					</tr>
				</tbody>
			</Table>
		</CardWrapper>
	);
};

export default Users;
