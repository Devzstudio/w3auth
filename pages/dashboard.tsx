import { Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import StatsCard from 'components/Dashboard/StatsCard';
import PageHeader from 'components/PageHeader';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { validateCookie } from 'lib/cookie';
import WalletAddress from 'components/UI/WalletAddress';

export const getServerSideProps: GetStaticProps = async (context) => {
	return validateCookie(context, async () => {
		const newUsers = await prisma.users.findMany({
			orderBy: {
				created_at: 'desc',
			},
			take: 10,
			include: {
				user_address: true,
			},
		});

		const lastLoginUsers = await prisma.users.findMany({
			orderBy: {
				last_login: 'desc',
			},
			take: 10,
			include: {
				user_address: true,
			},
		});

		const userCount = await prisma.users.count({});

		const allowlistCount = await prisma.allowlist.count({});
		const blocklistCount = await prisma.blocklist.count({});

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
				allowlistCount,
				blocklistCount,
			},
		};
	});
};

export default function Dashboard({
	newUsers,
	userCount,
	todaysUsers,
	lastLoginUsers,
	allowlistCount,
	blocklistCount,
}) {
	const new_users = JSON.parse(newUsers);
	const last_login_users = JSON.parse(lastLoginUsers);

	return (
		<section>
			<PageHeader title="Dashboard" />

			<CardWrapper label="Dashboard">
				<div className="px-4">
					<div className="grid md:grid-cols-12 gap-5">
						<StatsCard value={userCount} label="Total Users" />
						<StatsCard value={todaysUsers} label="New users today" />
						<StatsCard value={allowlistCount} label="Allowlist" />
						<StatsCard value={blocklistCount} label="Blocklist" />
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-5 px-4 pb-5">
					<section>
						<h4 className="text-xl ml-2 mt-5 pb-5 text-gray-900 dark:text-gray-100">New Users</h4>
						<div className="overflow-x-scroll">
							<Table striped highlightOnHover className="overflow-x-scroll">
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
												<td>
													{user.user_address[0]?.wallet_address ? (
														<WalletAddress
															chain={user.user_address[0]?.chain}
															address={user.user_address[0]?.wallet_address}
															shortAddress={true}
														/>
													) : (
														'-'
													)}
												</td>

												<td>{user.name ?? '-'}</td>
												<td>{user.email ?? '-'}</td>
												<td className="space-x-5">
													<Link href={`/users/details/${user.id}`} passHref>
														<a className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
															Details
														</a>
													</Link>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					</section>
					<section>
						<h4 className="text-xl ml-2 mt-5 pb-5 text-gray-900 dark:text-gray-100">Recent login</h4>
						<div className="overflow-x-scroll">
							<Table striped highlightOnHover className="overflow-x-scroll">
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
												<td>
													{user.user_address[0]?.wallet_address ? (
														<WalletAddress
															chain={user.user_address[0]?.chain}
															address={user.user_address[0]?.wallet_address}
															shortAddress={true}
														/>
													) : (
														'-'
													)}
												</td>

												<td>{user.name ?? '-'}</td>
												<td>{user.email ?? '-'}</td>
												<td className="space-x-5">
													<Link href={`/users/details/${user.id}`} passHref>
														<a className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
															Details
														</a>
													</Link>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					</section>
				</div>
			</CardWrapper>
		</section>
	);
}
