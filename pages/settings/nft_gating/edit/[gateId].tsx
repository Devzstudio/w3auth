import { Button, Select, Switch, TextInput } from '@mantine/core';
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

export const getServerSideProps: GetStaticProps = async (params: any) => {
	const records = await prisma.nft_gating.findFirst({
		where: {
			id: params.query.gateId,
		},
	});

	return {
		props: { record: JSON.stringify(records) },
	};
};

const Edit = ({ record }) => {
	const field = JSON.parse(record);

	const router = useRouter();
	const form = useForm({
		initialValues: {
			chain: field.chain,
			contract_address: field.contract_address,
			label: field.label,
			id: router.query.gateId,
		},
	});

	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_nft_gating' });

	useEffect(() => {
		if (response?.success) {
			toast.success('NFT Gating updated successfully');
			router.push('/settings/nft_gating');
		}
	}, [response]);

	return (
		<CardWrapper label="Edit NFT Gating">
			<PageHeader title="Edit NFT Gating" />

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
						label="Label"
						value={form.values.label}
						onChange={(e) => form.setFieldValue('label', e.target.value)}
					/>
					<TextInput
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
	);
};

export default Edit;
