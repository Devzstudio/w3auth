import { Button, Switch, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Create = () => {
	const form = useForm({
		initialValues: {
			wallet_address: '',
			name: '',
		},
	});
	const router = useRouter();

	const { loading, response, post } = useRequest({ url: '/api/console/settings/create_team_member' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Team member added successfully');
			router.push('/settings/team');
		}
	}, [response]);

	return (
		<CardWrapper label="Create Team Member">
			<PageHeader title="Create Team Member" />

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
						label="Name"
						value={form.values.name}
						onChange={(e) => form.setFieldValue('name', e.target.value)}
					/>

					<TextInput
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

export default Create;