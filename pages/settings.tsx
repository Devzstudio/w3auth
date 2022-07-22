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

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.settings.findMany({
			where: {
				name: {
					in: [
						'access_allowlist_only',
						'enable_nft_gating',
						'custom_jwt_claim',
						'enable_token_gating',
						'accept_custom_fields_on_registeration',
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
	email: '[USER_EMAIL]',
};

const SettingsPage = ({ records }) => {
	const settings = getSettings(JSON.parse(records));
	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_settings' });

	const form = useForm({
		initialValues: {
			custom_jwt_claim: settings.custom_jwt_claim,
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
							settings: form.values,
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
							label="Allow only allowlist users"
							checked={form.values.access_allowlist_only}
							onChange={() =>
								form.setFieldValue('access_allowlist_only', !form.values.access_allowlist_only)
							}
						/>
						<Switch
							label="Accept custom fields on registeration"
							color={'violet'}
							checked={form.values.accept_custom_fields_on_registeration}
							onChange={() =>
								form.setFieldValue(
									'accept_custom_fields_on_registeration',
									!form.values.accept_custom_fields_on_registeration
								)
							}
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
