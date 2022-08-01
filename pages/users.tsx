import prisma from 'lib/prisma';

import { useForm, UseFormReturnType } from '@mantine/form';

import { Select, Table, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import dayjs from 'dayjs';
import { Popover, Input, Button } from '@mantine/core';

import { useRouter } from 'next/router';
import Config from 'lib/config';
import { isEmpty } from 'lib/helpers';
import Pagination from 'components/UI/pagination/Pagination';
import useRequest from 'hooks/useRequests';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { validateCookie } from 'lib/cookie';
import WalletAddress from 'components/UI/WalletAddress';
import { FilterIcon } from '@heroicons/react/outline';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		let where = {};

		if (context.query.address) {
			where = {
				user_address: {
					some: {
						wallet_address: context.query.address,
					},
				},
			};
		}

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

const UserFilter = () => {
	const [opened, setOpened] = useState(false);
	const router = useRouter();

	const form = useForm({
		initialValues: {
			address: '',
		},
	});

	return (
		<>
			<Popover
				width={300}
				position="bottom-start"
				shadow="md"
				opened={opened}
				closeOnClickOutside
				onChange={(val) => setOpened(val)}
			>
				<Popover.Target>
					<Button
						className="text-gray-500 hover:text-gray-100"
						color="violet"
						onClick={() => setOpened(true)}
					>
						<FilterIcon className="w-4 h-4 mr-2" />
						Filters
					</Button>
				</Popover.Target>
				<Popover.Dropdown>
					<section className="text-gray-500 dark:text-gray-100 ">
						<div className="flex justify-between items-center">
							<h4 className="font-medium">Filters</h4>

							<Button
								onClick={() => {
									router.push(`?address=${form.values.address}`);
									setOpened(false);
								}}
								variant="subtle"
							>
								Apply Filter
							</Button>
						</div>

						<div className="mt-5">
							<Input.Wrapper label="Address">
								{/* <div className="grid grid-cols-12 gap-5">  */}
								<TextInput
									value={form.values.address}
									onChange={(e) => form.setFieldValue('address', e.target.value)}
									className="col-span-8"
									placeholder="Address"
								/>
								{/* </div> */}
							</Input.Wrapper>
						</div>
					</section>
				</Popover.Dropdown>
			</Popover>
		</>
	);
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
										/>
									) : (
										'-'
									)}
								</td>

								<td>{user.name ?? '-'}</td>
								<td>{user.email ?? '-'}</td>
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

									<Button
										size="xs"
										loading={loading}
										variant="subtle"
										onClick={() => blockUser(user.id, user.is_blocked == true ? false : true)}
										className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
									>
										{user.is_blocked ? 'Unblock' : 'Block'}
									</Button>
								</td>
							</tr>
						);
					})}
					{isEmpty(users_list) && (
						<tr>
							<td colSpan={6}>There are no records.</td>
						</tr>
					)}
				</tbody>
			</Table>

			<Pagination total={total} />
		</CardWrapper>
	);
};

export default Users;
