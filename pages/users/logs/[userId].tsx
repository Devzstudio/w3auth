import { Table } from '@mantine/core';
import CardWrapper from 'components/card/CardWrapper';
import PageHeader from 'components/PageHeader';

const Users = () => {
	return (
		<CardWrapper label="Login logs">
			<PageHeader title="Login logs" />

			<Table striped highlightOnHover>
				<thead>
					<tr>
						<th>Browser</th>
						<th>IP</th>
						<th>Country</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Chrome</td>
						<td>124.0.01</td>
						<td>India</td>
						<td></td>
					</tr>
				</tbody>
			</Table>
		</CardWrapper>
	);
};

export default Users;
