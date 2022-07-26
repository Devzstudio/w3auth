import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { ChainSelectList } from 'lib/chains';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import { validateCookie } from 'lib/cookie';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.token_gating.findFirst({
			where: {
				id: context.query.gateId,
			},
		});

		return {
			props: { record: JSON.stringify(records) },
		};
	});
};

const Edit = ({ record }) => {
	const field = JSON.parse(record);

	const router = useRouter();
	const form = useForm({
		initialValues: {
			label: field.label,
			chain: field.chain,
			contract_address: field.contract_address,
			value: field.value,
			id: router.query.gateId,
		},
	});

	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_token_gating' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Token Gating updated successfully');
			router.push('/settings/token_gating');
		}
	}, [response]);

	return (
		<CardWrapper label="Edit Token Gating">
			<PageHeader title="Edit Token Gating" />

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
	);
};

export default Edit;
