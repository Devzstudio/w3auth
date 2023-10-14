import { Badge, Button, Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import dayjs from 'dayjs';
import { isEmpty, shortenAddress, walletExplore } from 'lib/helpers';
import { validateCookie } from 'lib/cookie';
import { ChainLogo } from 'lib/chains';
import { useRouter } from 'next/router';
import { EyeIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const record = await prisma.users.findFirst({
			where: {
				id: context.query.userId,
			},
			include: {
				user_address: true,
			},
		});

		const customFields = await prisma.user_custom_field.findMany({
			where: {
				user_id: record.id,
			},
			include: {
				custom_fields: true,
			},
		});

		return {
			props: { record: JSON.stringify(record), customFields: JSON.stringify(customFields) },
		};
	});
};

const TableField = ({ label, value, copy = false, link = '' }) => {
	return (
		<tr>
			<td>{label}</td>
			<td>
				{copy ? (
					<>
						<CopyToClipboard text={value} onCopy={() => toast.success('Copied')}>
							<span className="cursor-copy">{value} </span>
						</CopyToClipboard>
					</>
				) : (
					<>
						{link ? (
							<>
								<a href={link} target="_BLANK" rel="noreferrer noopener">
									{value}
								</a>
							</>
						) : (
							<>{value}</>
						)}
					</>
				)}
			</td>
		</tr>
	);
};

const Users = ({ record, customFields }) => {
	const router = useRouter();
	const user = JSON.parse(record);
	const custom_fields = JSON.parse(customFields);

	const {
		loading: removeCustomFieldLoading,
		response: removeCustomFieldResponse,
		post: removeCustomField,
	} = useRequest({ url: '/api/console/users/remove_custom_field' });

	const {
		loading: removeWalletLoading,
		response: removeWalletResponse,
		post: removeWallet,
	} = useRequest({ url: '/api/console/users/unlink_wallet' });

	useEffect(() => {
		if (removeCustomFieldResponse?.success) {
			toast.success('Removed custom field');
			router.replace(router.asPath);
		}
	}, [removeCustomFieldResponse]);

	useEffect(() => {
		if (removeWalletResponse?.success) {
			toast.success('Removed wallet');
			router.replace(router.asPath);
		}
	}, [removeWalletResponse]);

	return (
		<CardWrapper label={user.name ?? shortenAddress(user.user_address[0].wallet_address)}>
			<PageHeader title={user.name ?? shortenAddress(user.user_address[0].wallet_address)} />

			<div className="px-4 pb-5">
				<div className="grid place-items-end">
					<Badge color={user.kyc_verified ? 'green' : 'orange'} variant="outline">
						{user.kyc_verified ? 'KYC Verified' : 'KYC Not verified'}
					</Badge>
				</div>

				{user.note && (
					<div className="text-yellow-600 dark:text-yellow-100 my-5 bg-yellow-100 dark:bg-yellow-900 rounded p-1">
						{user.note}
					</div>
				)}

				<div className="grid md:grid-cols-2 gap-5 mb-5">
					<section>
						<div className="flex items-center justify-between">
							<h4 className="mb-5 text-gray-900 dark:text-gray-100">Basic Details</h4>
							<Button
								size="xs"
								variant="subtle"
								onClick={() => router.push(`/users/edit/${user.id}`)}
								className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
							>
								Edit
							</Button>
						</div>
						<Table striped>
							<tbody>
								<TableField label="#" value={user.id} copy />
								<TableField label="Email" value={user.email} copy />
								<TableField label="Blocked" value={user.is_blocked ? 'Yes' : 'No'} />
								<TableField label="Created at" value={dayjs(user.created_at).format('DD MMMM YYYY')} />
								<TableField
									label="Last active"
									value={user.last_login ? dayjs(user.last_login).format('DD MMMM YYYY') : '-'}
								/>
								<TableField
									label="Twitter username"
									value={user.twitter_username ?? '-'}
									link={user.twitter_username ? `https://twitter.com/${user.twitter_username}` : ''}
								/>
								<TableField
									label="Telegram username"
									value={user.telegram_username ?? '-'}
									link={
										user.telegram_username
											? `https://web.telegram.org/k/#@${user.telegram_username}`
											: ''
									}
								/>
								<TableField label="Discord username" value={user.discord_username ?? '-'} copy />
								<TableField label="KYC Processed Id" value={user.kyc_processed_id ?? '-'} />
							</tbody>
						</Table>
						<h4 className="mb-5 mt-10 text-gray-900 dark:text-gray-100">Custom Fields</h4>
						<Table striped>
							<tbody>
								{custom_fields.map((field) => {
									return (
										<tr key={field.value}>
											<td>{field.custom_fields.label}</td>
											<td>{field.value}</td>
											<td>
												<div className="flex items-center space-x-5">
													<Link passHref href={`/users/custom_field/edit/${field.field_id}`}>
														<a className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
															<PencilAltIcon className="w-4 h-4" />
														</a>
													</Link>

													<Button
														size="xs"
														loading={removeCustomFieldLoading}
														variant="subtle"
														onClick={() =>
															removeCustomField({
																id: field.field_id,
															})
														}
														color="gray"
														className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
													>
														<TrashIcon className="w-4 h-4" />
													</Button>
												</div>
											</td>
										</tr>
									);
								})}

								{isEmpty(custom_fields) && (
									<tr>
										<td>There are no records.</td>
									</tr>
								)}
							</tbody>
						</Table>
					</section>
					<section>
						<h4 className="mb-5 text-gray-900 dark:text-gray-100">Wallets</h4>
						<Table striped>
							<tbody>
								{user.user_address.map((wallet) => {
									return (
										<tr key={wallet.wallet_address}>
											<td>
												<div className="flex items-center">
													<img
														src={ChainLogo[wallet.chain.toUpperCase()]}
														className="w-4 h-4 mr-2 rounded-full"
														alt=""
													/>
													{wallet.chain.toUpperCase()}
												</div>
											</td>
											<td>
												<CopyToClipboard
													text={wallet.wallet_address}
													onCopy={() => toast.success('Copied')}
												>
													<span className="cursor-copy">{wallet.wallet_address}</span>
												</CopyToClipboard>
											</td>
											<td>
												<Button
													component="a"
													href={walletExplore(
														wallet.chain.toLocaleLowerCase(),
														wallet.wallet_address
													)}
													target="_BLANK"
													size="xs"
													variant="subtle"
													color="gray"
													className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
												>
													<EyeIcon className="w-4 h-4" />
												</Button>

												{user.user_address.length > 1 && (
													<Button
														size="xs"
														loading={removeWalletLoading}
														variant="subtle"
														color="gray"
														onClick={() =>
															removeWallet({
																id: wallet.user_address_id,
															})
														}
														className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
													>
														<TrashIcon className="w-4 h-4" />
													</Button>
												)}
											</td>
										</tr>
									);
								})}

								{isEmpty(user.user_address) && (
									<tr>
										<td colSpan={3}>There are no records.</td>
									</tr>
								)}
							</tbody>
						</Table>
					</section>
				</div>
			</div>
		</CardWrapper>
	);
};

export default Users;
