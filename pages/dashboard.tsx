import { Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import StatsCard from 'components/Dashboard/StatsCard';
import PageHeader from 'components/PageHeader';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export const getServerSideProps: GetStaticProps = async (context) => {
	const newUsers = await prisma.users.findMany({
		orderBy: {
			created_at: 'desc',
		},
		take: 10,
	});

	const lastLoginUsers = await prisma.users.findMany({
		orderBy: {
			last_login: 'desc',
		},
		take: 10,
	});

	const userCount = await prisma.users.count({});

	const todaysUsers = await prisma.users.count({
		where: {
			created_at: {
				gt: new Date(),
			},
		},
	});

	return {
		props: {
			newUsers: JSON.stringify(newUsers),
			lastLoginUsers: JSON.stringify(lastLoginUsers),
			userCount,
			todaysUsers,
		},
	};
};

export default function Dashboard({ newUsers, userCount, todaysUsers, lastLoginUsers }) {
	const new_users = JSON.parse(newUsers);
	const last_login_users = JSON.parse(lastLoginUsers);

	return (
		<section>
			<PageHeader title="Dashboard" />

			<CardWrapper label="Dashboard">
				<div className="px-4">
					<div className="flex space-x-5">
						<StatsCard value={userCount} label="Total Users" />
						<StatsCard value={todaysUsers} label="New users today" />
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
								{new_users.map((user) => {
									return (
										<tr key={user.id}>
											<td>0x </td>
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td className="space-x-5">
												<Link
													as={`/users/details/${user.id}`}
													href={`/users/details/${user.id}`}
												>
													<a className="cursor-pointer text-gray-500 hover:text-gray-100">
														Details
													</a>
												</Link>
											</td>
										</tr>
									);
								})}
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
								{last_login_users.map((user) => {
									return (
										<tr key={user.id}>
											<td>0x </td>
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td className="space-x-5">
												<Link
													as={`/users/details/${user.id}`}
													href={`/users/details/${user.id}`}
												>
													<a className="cursor-pointer text-gray-500 hover:text-gray-100">
														Details
													</a>
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</section>
				</div>
			</CardWrapper>
		</section>
	);
}
