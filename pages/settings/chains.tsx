import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';
import ChainCard from 'components/Settings/ChainCard';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import { getSettings } from 'lib/helpers';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@mantine/core';
import ConfigChains from 'lib/chains';
import { validateCookie } from 'lib/cookie';
import Heading from 'components/UI/Heading';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.settings.findMany({
			where: {
				name: {
					in: [
						'enable_eth',
						'enable_bnb',
						'enable_matic',
						'enable_glmr',
						'enable_ftm',
						'enable_movr',
						'enable_avax',
						'enable_sol',
					],
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
			enable_eth: settings.enable_eth,
			enable_bnb: settings.enable_bnb,
			enable_matic: settings.enable_matic,
			enable_glmr: settings.enable_glmr,
			enable_ftm: settings.enable_ftm,
			enable_movr: settings.enable_movr,
			enable_avax: settings.enable_avax,
			enable_sol: settings.enable_sol,
		},
	});

	useEffect(() => {
		if (response?.success) {
			toast.success('Updated settings');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<PageHeader title="Chains Settings" />

			<Heading
				heading="Chains"
				sub_heading="Chains can be enabled and obtained via API calls. On the basis of that, you can customize the options at the front end."
			/>

			<form
				onSubmit={(e) => {
					e.preventDefault();

					post({
						settings: form.values,
					});
				}}
			>
				<div className="grid grid-cols-12 gap-5">
					{ConfigChains.map((chain) => {
						return (
							<ChainCard
								key={chain.symbol}
								label={chain.symbol}
								icon={chain.icon}
								checked={form.values[`enable_${chain.symbol.toLocaleLowerCase()}`]}
								onChange={() =>
									form.setFieldValue(
										`enable_${chain.symbol.toLocaleLowerCase()}`,
										!form.values[`enable_${chain.symbol.toLocaleLowerCase()}`]
									)
								}
							/>
						);
					})}
				</div>
				<div className="mt-5 mb-5">
					<Button variant="outline" color="violet" type="submit" loading={loading}>
						Save
					</Button>
				</div>
			</form>
		</SettingsWrapper>
	);
};

export default Settings;
