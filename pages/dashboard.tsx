import { Table } from '@mantine/core';
import CardWrapper from 'components/card/CardWrapper';
import PageHeader from 'components/PageHeader';

const StatsCard = ({ label, value }) => {
	return (
		<div className="bg-dark-900 rounded p-5 col-span-3">
			<div className="flex justify-between items-center">
				<span className="mr-2 text-xl">{value}</span>
				<h4 className="flex items-center text-gray-400">{label}</h4>
			</div>
		</div>
	);
};

export default function Dashboard() {
	return (
		<section>
			<PageHeader title="Dashboard" />

			<CardWrapper label="Dashboard">
				<div className="px-4">
					<div className="flex space-x-5">
						<StatsCard value={4} label="Total Users" />
						<StatsCard value={14} label="New users today" />
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-5 px-4 pb-5">
					<section>
						<h4 className="text-xl ml-2 mt-5 pb-5">New Users</h4>
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
					</section>
					<section>
						<h4 className="text-xl ml-2 mt-5 pb-5">Recent login</h4>
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
					</section>
				</div>
			</CardWrapper>
		</section>
	);
}
