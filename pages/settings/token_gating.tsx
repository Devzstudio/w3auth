import SettingsWrapper from 'components/Settings/SettingsWrapper';
import { Button, NumberInput, TextInput } from '@mantine/core';
import PageHeader from 'components/PageHeader';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import { getSettings } from 'lib/helpers';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import CardWrapper from 'components/UI/card/CardWrapper';
import { validateCookie } from 'lib/cookie';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.settings.findMany({
			where: {
				name: {
					in: ['token_gating_contract_address', 'token_gating_amount_required'],
				},
			},
		});

		return {
			props: { records: JSON.stringify(records) },
		};
	});
};

const Settings = ({ records }) => {
	const settings = getSettings(JSON.parse(records));
	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_settings' });

	const form = useForm({
		initialValues: {
			token_gating_contract_address: settings.token_gating_contract_address,
			token_gating_amount_required: settings.token_gating_amount_required,
		},
	});

	useEffect(() => {
		if (response?.success) {
			toast.success('Updated settings');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<PageHeader title="Token Gating" />

			<CardWrapper label="Token Gating">
				<form
					onSubmit={(e) => {
						e.preventDefault();

						post({
							settings: form.values,
						});
					}}
				>
					<div className="px-6 py-4 space-y-5">
						<TextInput
							label="Token contract address"
							value={form.values.token_gating_contract_address}
							onChange={(val) => form.setFieldValue('token_gating_contract_address', val)}
						/>

						<NumberInput
							label="Minium Token amount required"
							value={form.values.token_gating_amount_required}
							onChange={(val) => form.setFieldValue('token_gating_amount_required', val)}
						/>

						<Button variant="outline" color="violet" type="submit" loading={loading}>
							Save
						</Button>
					</div>
				</form>
			</CardWrapper>
		</SettingsWrapper>
	);
};

export default Settings;
