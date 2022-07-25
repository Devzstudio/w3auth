import SettingsWrapper from 'components/Settings/SettingsWrapper';
import { Button, Code, Switch, Textarea, TextInput } from '@mantine/core';
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
					in: ['blockpass_apikey', 'blockpass_clientid'],
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
			blockpass_apikey: settings.blockpass_apikey,
			blockpass_clientid: settings.blockpass_clientid,
		},
	});

	useEffect(() => {
		if (response?.success) {
			toast.success('Updated settings');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<PageHeader title="Blockpass" />

			<CardWrapper label="Blockpass">
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
							label="Blockpass Client ID"
							value={form.values.blockpass_clientid}
							onChange={(e) => form.setFieldValue('blockpass_clientid', e.target.value)}
						/>

						<TextInput
							label="Blockpass API Key"
							value={form.values.blockpass_apikey}
							onChange={(e) => form.setFieldValue('blockpass_apikey', e.target.value)}
						/>

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
