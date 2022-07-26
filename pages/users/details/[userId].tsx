import { Badge, Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import dayjs from 'dayjs';
import { isEmpty } from 'lib/helpers';
import { validateCookie } from 'lib/cookie';
import { ChainLogo } from 'lib/chains';

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

const TableField = ({ label, value }) => {
	return (
		<tr>
			<td>{label}</td>
			<td>{value}</td>
		</tr>
	);
};

const Users = ({ record, customFields }) => {
	const user = JSON.parse(record);
	const custom_fields = JSON.parse(customFields);

	return (
		<CardWrapper label={user.name}>
			<PageHeader title={user.name} />

			<div className="px-4 pb-5">
				<div className="grid place-items-end">
					<Badge color={user.kyc_verified ? 'green' : 'orange'} variant="outline">
						{user.kyc_verified ? 'KYC Verified' : 'KYC Not verified'}
					</Badge>
				</div>

				<div className="grid md:grid-cols-2 gap-5">
					<section>
						<h4 className="mb-5">Basic Details</h4>
						<Table striped>
							<tbody>
								<TableField label="#" value={user.id} />
								<TableField label="Email" value={user.email} />
								<TableField label="Blocked" value={user.is_blocked ? 'Yes' : 'No'} />
								<TableField label="Created at" value={dayjs(user.created_at).format('DD MMMM YYYY')} />
								<TableField
									label="Last active"
									value={user.last_login ? dayjs(user.last_login).format('DD MMMM YYYY') : '-'}
								/>
								<TableField label="Twitter username" value={user.twitter_username} />
								<TableField label="Telegram username" value={user.telegram_username} />
								<TableField label="Discord username" value={user.discord_username} />
								<TableField label="KYC Processed Id" value={user.kyc_processed_id ?? '-'} />
							</tbody>
						</Table>
						<h4 className="mb-5 mt-10">Custom Fields</h4>
						<Table striped>
							<tbody>
								{custom_fields.map((field) => {
									return (
										<TableField
											label={field.custom_fields.label}
											value={field.value}
											key={field.value}
										/>
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
						<h4 className="mb-5">Wallets</h4>
						<Table striped>
							<tbody>
								{user.user_address.map((wallet) => {
									return (
										<tr key={wallet.wallet_address}>
											<td className="flex items-center">
												<img
													src={ChainLogo[wallet.chain.toUpperCase()]}
													className="w-4 h-4 mr-2"
													alt=""
												/>
												{wallet.chain.toUpperCase()}
											</td>
											<td>{wallet.wallet_address}</td>
										</tr>
									);
								})}

								{isEmpty(user.user_address) && (
									<tr>
										<td>There are no records.</td>
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
