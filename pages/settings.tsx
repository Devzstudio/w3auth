import SettingsWrapper from 'components/Settings/SettingsWrapper';
import { Button, Code, Switch, Textarea } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { getSettings } from 'lib/helpers';
import { useForm } from '@mantine/hooks';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { validateCookie } from 'lib/cookie';
import CountrySelect from 'components/UI/CountrySelect';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.settings.findMany({
			where: {
				name: {
					in: [
						'access_allowlist_only',
						'enable_nft_gating',
						'enable_token_gating',
						'accept_custom_fields_on_registeration',
						'custom_jwt_claim',
						'log_user_logins',
						'country_blocklist',
					],
				},
			},
		});

		return {
			props: { records: JSON.stringify(records) },
		};
	});
};

const example = {
	user_id: '[USER_ID]',
	name: '[USER_NAME]',
	email: '[USER_EMAIL]',
	kyc_status: '[USER_KYC_STATUS]',
	kyc_processed_id: '[USER_KYC_PROCESS_ID]',
};

const SettingsPage = ({ records }) => {
	const settings = getSettings(JSON.parse(records));
	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_settings' });

	const form = useForm({
		initialValues: {
			country_blocklist: settings.country_blocklist.split(','),
			custom_jwt_claim: settings.custom_jwt_claim,
			log_user_logins: settings.log_user_logins,
			access_allowlist_only: settings.access_allowlist_only,
			enable_nft_gating: settings.enable_nft_gating,
			enable_token_gating: settings.enable_token_gating,
			accept_custom_fields_on_registeration: settings.accept_custom_fields_on_registeration,
		},
	});

	useEffect(() => {
		if (response?.success) {
			toast.success('Updated settings');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<PageHeader title="General Settings" />

			<CardWrapper label="General">
				<form
					onSubmit={(e) => {
						e.preventDefault();

						post({
							settings: {
								...form.values,
								country_blocklist: form.values.country_blocklist.join(','),
							},
						});
					}}
				>
					<div className="px-6 py-4 space-y-5">
						<Switch
							color={'violet'}
							label="Allow only allowlist users"
							checked={form.values.access_allowlist_only}
							onChange={() =>
								form.setFieldValue('access_allowlist_only', !form.values.access_allowlist_only)
							}
						/>
						<Switch
							color={'violet'}
							label="Enable NFT Gating"
							checked={form.values.enable_nft_gating}
							onChange={() => form.setFieldValue('enable_nft_gating', !form.values.enable_nft_gating)}
						/>
						<Switch
							color={'violet'}
							label="Enable Token Gating"
							checked={form.values.enable_token_gating}
							onChange={() => form.setFieldValue('enable_token_gating', !form.values.enable_token_gating)}
						/>
						<Switch
							label="Log user login details"
							color={'violet'}
							checked={form.values.log_user_logins}
							onChange={() => form.setFieldValue('log_user_logins', !form.values.log_user_logins)}
						/>

						<CountrySelect
							label="Country Blocklist"
							value={form.values.country_blocklist}
							onChange={(val) => form.setFieldValue('country_blocklist', val)}
						/>

						<div className="grid md:grid-cols-2 gap-5">
							<Textarea
								minRows={5}
								label="Custom JWT Claim"
								value={form.values.custom_jwt_claim}
								onChange={(val) => form.setFieldValue('custom_jwt_claim', val)}
							/>
							<div className=" text-gray-500">
								<p className="text-sm mb-2 block">Example</p>
								<Code block>{JSON.stringify(example, null, 2)}</Code>
								<p className="text-xs text-gray-500 block mt-1">
									User values are substituted for these variables
								</p>
							</div>
						</div>

						<div className="mt-5 mb-5">
							<Button variant="outline" color="violet" type="submit" loading={loading}>
								Save
							</Button>
						</div>
					</div>
				</form>
			</CardWrapper>
		</SettingsWrapper>
	);
};

export default SettingsPage;
