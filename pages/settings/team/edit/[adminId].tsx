import { Button, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import { validateCookie } from 'lib/cookie';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.admins.findFirst({
			where: {
				admin_id: context.query.adminId,
			},
		});

		return {
			props: { record: JSON.stringify(records) },
		};
	});
};

const Edit = ({ record }) => {
	const router = useRouter();
	const user = JSON.parse(record);
	const form = useForm({
		initialValues: {
			id: router.query.adminId,
			wallet_address: user.wallet_address,
			name: user.name,
		},
	});

	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_team_member' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Team member edited successfully');
			router.push('/settings/team');
		}
	}, [response]);

	return (
		<CardWrapper label="Edit Team Member">
			<PageHeader title="Edit Team Member" />

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
						label="Name"
						value={form.values.name}
						onChange={(e) => form.setFieldValue('name', e.target.value)}
					/>

					<TextInput
						color="violet"
						label="EVM Wallet Address"
						value={form.values.wallet_address}
						onChange={(e) => form.setFieldValue('wallet_address', e.target.value)}
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
