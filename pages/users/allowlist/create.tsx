import { Button, TextInput } from '@mantine/core';
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
			label: '',
			address: '',
		},
	});
	const router = useRouter();

	const { loading, response, post } = useRequest({ url: '/api/console/users/create_allowlist' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Added to allowlist');
			router.push('/users/allowlist');
		}
	}, [response]);

	return (
		<CardWrapper label="Create Allowlist">
			<PageHeader title="Create Allowlist" />

			<div className="px-3 pb-5">
				<form
					className="space-y-5 md:w-1/2"
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
					<TextInput
						label="Address"
						value={form.values.address}
						onChange={(e) => form.setFieldValue('address', e.target.value)}
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
