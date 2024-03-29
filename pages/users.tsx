import prisma from 'lib/prisma';

import { Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import dayjs from 'dayjs';
import { Button } from '@mantine/core';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRouter } from 'next/router';
import Config from 'lib/config';
import { isEmpty, whereCondition } from 'lib/helpers';
import Pagination from 'components/UI/pagination/Pagination';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { validateCookie } from 'lib/cookie';
import WalletAddress from 'components/UI/WalletAddress';
import UserFilter from 'components/Users/UserFilter';
import { DiscordLogoIcon, PaperPlaneIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const where = whereCondition({
			context,
			fieldMapping: {
				telegram: 'telegram_username',
				twitter: 'twitter_username',
				discrod: 'discord_username',
			},

			relationCondition: {
				address: {
					user_address: {
						some: {
							wallet_address: {
								[context.query.address_condition ?? 'equals']: context.query.address,
							},
						},
					},
				},
				chain: {
					user_address: {
						some: {
							chain: {
								in: context.query.chain,
							},
						},
					},
				},
			},
		});

		const records = await prisma.users.findMany({
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
			where: where,
			include: {
				user_address: true,
			},
		});

		const total = await prisma.users.count({});

		return {
			props: { records: JSON.stringify(records), total },
		};
	});
};

const Users = ({ records, total }) => {
	const users_list = JSON.parse(records);
	const router = useRouter();
	const { loading, response, post } = useRequest({ url: '/api/console/users/block_user' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Updated user.');
			router.replace(router.asPath);
		}
	}, [response]);

	const blockUser = (id, is_blocked) => {
		post({
			user_id: id,
			is_blocked,
		});
	};

	return (
		<CardWrapper label="Users">
			<PageHeader title="Users" />

			<div className="px-3 mb-5">
				<UserFilter />
			</div>

			<Table striped highlightOnHover>
				<thead>
					<tr>
						<th>Address</th>
						<th>Name</th>
						<th>Social</th>
						<th>Email</th>
						<th>Created at</th>
						<th>Last Active</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users_list.map((user) => {
						return (
							<tr key={user.id}>
								<td>
									{user.user_address[0]?.wallet_address ? (
										<WalletAddress
											chain={user.user_address[0]?.chain}
											address={user.user_address[0]?.wallet_address}
											shortAddress
										/>
									) : (
										'-'
									)}
								</td>

								<td>{user.name ?? '-'}</td>
								<td>
									<div className="flex items-center space-x-3">
										{user.twitter_username && (
											<a
												rel="noopener noreferrer"
												className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
												target={'_BLANK'}
												href={`https://twitter.com/${user.twitter_username}`}
											>
												<TwitterLogoIcon />
											</a>
										)}

										{user.discord_username && (
											<CopyToClipboard
												text={user.discord_username}
												onCopy={() => toast.success('Copied')}
											>
												<span className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 cursor-copy">
													<DiscordLogoIcon />
												</span>
											</CopyToClipboard>
										)}

										{user.telegram_username && (
											<a
												rel="noopener noreferrer"
												className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 telegram_send"
												target={'_BLANK'}
												href={`https://web.telegram.org/k/#@${user.telegram_username}`}
											>
												<PaperPlaneIcon />
											</a>
										)}
									</div>
								</td>
								<td>
									<CopyToClipboard text={user.email} onCopy={() => toast.success('Copied')}>
										<span className="cursor-copy">{user.email ?? '-'}</span>
									</CopyToClipboard>
								</td>
								<td>{dayjs(user.created_at).format('DD MMM YYYY')}</td>
								<td>{user.last_login ? dayjs(user.last_login).format('DD MMM YYYY') : '-'}</td>
								<td className="space-x-5">
									<Button
										size="xs"
										variant="subtle"
										onClick={() => router.push(`/users/logs/${user.id}`)}
										className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
									>
										Logs
									</Button>

									<Button
										size="xs"
										loading={loading}
										variant="subtle"
										onClick={() => blockUser(user.id, user.is_blocked == true ? false : true)}
										className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
									>
										{user.is_blocked ? 'Unblock' : 'Block'}
									</Button>

									<Button
										size="xs"
										variant="subtle"
										onClick={() => router.push(`/users/edit/${user.id}`)}
										className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
									>
										Edit
									</Button>

									<Button
										size="xs"
										variant="subtle"
										onClick={() => router.push(`/users/details/${user.id}`)}
										className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
									>
										Details
									</Button>
								</td>
							</tr>
						);
					})}
					{isEmpty(users_list) && (
						<tr>
							<td colSpan={7}>There are no records.</td>
						</tr>
					)}
				</tbody>
			</Table>

			<Pagination total={total} />
		</CardWrapper>
	);
};

export default Users;
