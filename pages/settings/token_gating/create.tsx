import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { ChainSelectList } from 'lib/chains';

const Create = () => {
	const form = useForm({
		initialValues: {
			chain: '',
			contract_address: '',
			value: '',
			label: '',
		},
	});
	const router = useRouter();

	const { loading, response, post } = useRequest({ url: '/api/console/settings/create_token_gating' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Token Gating added successfully');
			router.push('/settings/token_gating');
		}
	}, [response]);

	return (
		<CardWrapper label="Create Token Gating">
			<PageHeader title="Create Token Gating" />

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
						label="Label"
						value={form.values.label}
						onChange={(e) => form.setFieldValue('label', e.target.value)}
					/>

					<Select
						label="Chain"
						value={form.values.chain}
						onChange={(val) => form.setFieldValue('chain', val)}
						data={ChainSelectList}
					></Select>
					<TextInput
						label="Contract Address"
						value={form.values.contract_address}
						onChange={(e) => form.setFieldValue('contract_address', e.target.value)}
					/>
					<NumberInput
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
	);
};

export default Create;
