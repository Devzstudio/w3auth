import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { ChainSelectList } from 'lib/chains';
import SettingsWrapper from 'components/Settings/SettingsWrapper';

const TokenGatingForm = ({ url, initialValues = {}, label, successMessage }) => {
	const form = useForm({
		initialValues: {
			chain: '',
			contract_address: '',
			value: '',
			label: '',
			...initialValues,
		},
	});
	const router = useRouter();

	const { loading, response, post } = useRequest({ url });

	useEffect(() => {
		if (response?.success) {
			toast.success(successMessage);
			router.push('/settings/token_gating');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<CardWrapper label={label}>
				<PageHeader title={label} />

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
						<TextInput
							color="violet"
							label="Label"
							value={form.values.label}
							onChange={(e) => form.setFieldValue('label', e.target.value)}
						/>

						<Select
							color="violet"
							label="Chain"
							value={form.values.chain}
							onChange={(val) => form.setFieldValue('chain', val)}
							data={ChainSelectList}
						></Select>

						<TextInput
							color="violet"
							label="Contract Address"
							value={form.values.contract_address}
							onChange={(e) => form.setFieldValue('contract_address', e.target.value)}
						/>

						<NumberInput
							color="violet"
							label="Value"
							value={Number(form.values.value)}
							onChange={(val) => form.setFieldValue('value', String(val))}
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

export default TokenGatingForm;
