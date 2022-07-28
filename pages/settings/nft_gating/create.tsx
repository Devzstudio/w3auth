import { Button, Select, Switch, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { ChainSelectList } from 'lib/chains';
import SettingsWrapper from 'components/Settings/SettingsWrapper';

const Create = () => {
	const form = useForm({
		initialValues: {
			chain: '',
			contract_address: '',
			label: '',
		},
	});
	const router = useRouter();

	const { loading, response, post } = useRequest({ url: '/api/console/settings/create_nft_gating' });

	useEffect(() => {
		if (response?.success) {
			toast.success('NFT Gating added successfully');
			router.push('/settings/nft_gating');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<CardWrapper label="Create NFT Gating">
				<PageHeader title="Create NFT Gating" />

				<div className="px-3 pb-5">
					<form
						className="space-y-5"
						onSubmit={(e) => {
							e.preventDefault();

							post({
								...form.values,
							});
						}}
					>
						<Select
							label="Chain"
							value={form.values.chain}
							onChange={(val) => form.setFieldValue('chain', val)}
							data={ChainSelectList}
						></Select>
						<TextInput
							color="violet"
							label="Label"
							value={form.values.label}
							onChange={(e) => form.setFieldValue('label', e.target.value)}
						/>
						<TextInput
							color="violet"
							label="Contract Address"
							value={form.values.contract_address}
							onChange={(e) => form.setFieldValue('contract_address', e.target.value)}
						/>

						<Button loading={loading} variant="outline" color="violet" type="submit">
							Submit
						</Button>
					</form>
				</div>
			</CardWrapper>
		</SettingsWrapper>
	);
};

export default Create;
