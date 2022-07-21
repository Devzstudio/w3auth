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

export const getServerSideProps: GetStaticProps = async (params: any) => {
	const records = await prisma.settings.findMany({
		where: {
			name: {
				in: ['access_allowlist_only', 'accept_custom_fields_on_registeration'],
			},
		},
	});

	return {
		props: { records: JSON.stringify(records) },
	};
};

const example = {
	'user-id': '[USER_ID]',
	email: '[USER_EMAIL]',
};

const SettingsPage = ({ records }) => {
	const settings = getSettings(JSON.parse(records));
	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_settings' });

	const form = useForm({
		initialValues: {
			access_allowlist_only: settings.access_allowlist_only,
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

						<div>
							<Textarea label="Custom JWT Claim" />
							<div className="md:w-1/2 text-gray-500">
								<p className="text-sm mt-5 mb-2 block">Example</p>
								<Code block>{JSON.stringify(example, null, 2)}</Code>
								<p className="text-sm text-gray-500 block mt-1">
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
