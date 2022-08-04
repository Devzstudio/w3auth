import SettingsWrapper from 'components/Settings/SettingsWrapper';
import { Button, Code, Switch, Textarea, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { broofa, getSettings } from 'lib/helpers';
import { useForm } from '@mantine/form';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { validateCookie } from 'lib/cookie';
import CountrySelect from 'components/UI/CountrySelect';
import { randomUUID } from 'crypto';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.settings.findMany({
			where: {
				name: {
					in: ['enable_api', 'api_key', 'api_ip_whitelist'],
				},
			},
		});

		return {
			props: { records: JSON.stringify(records) },
		};
	});
};

const SettingsPage = ({ records }) => {
	const settings = getSettings(JSON.parse(records));
	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_settings' });

	const form = useForm({
		initialValues: {
			enable_api: settings.enable_api,
			api_key: settings.api_key,
			api_ip_whitelist: settings.api_ip_whitelist ? settings.api_ip_whitelist : '',
		},
	});

	useEffect(() => {
		if (response?.success) {
			toast.success('Updated settings');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<PageHeader title="API" />

			<CardWrapper label="API" noMargin>
				<p className="text-sm text-gray-500 mt-2 pl-3 mb-5">
					W3auth data can be accessed via API by an external application.
				</p>
				<form
					onSubmit={(e) => {
						e.preventDefault();

						post({
							settings: {
								...form.values,
							},
						});
					}}
				>
					<div className="px-6 py-4 space-y-5">
						<Switch
							color={'violet'}
							label="Enable API"
							checked={form.values.enable_api}
							onChange={() => form.setFieldValue('enable_api', !form.values.enable_api)}
						/>

						<div>
							<TextInput
								disabled
								label="API Key"
								value={form.values.api_key}
								onChange={(e) => form.setFieldValue('api_key', e.target.value)}
							/>

							<Button
								className="mt-2"
								color={'gray'}
								onClick={() => {
									form.setFieldValue('api_key', broofa());
								}}
								compact
								size="xs"
							>
								Generate API Key
							</Button>
						</div>

						<Textarea
							value={form.values.api_ip_whitelist}
							onChange={(e) => form.setFieldValue('api_ip_whitelist', e.target.value)}
							label="Whitelist IP"
							minRows={2}
							placeholder=""
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
