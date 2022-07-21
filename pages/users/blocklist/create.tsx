import { Button, Table, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Create = () => {
	const form = useForm({
		initialValues: {
			note: '',
			address: '',
		},
	});
	const router = useRouter();

	const { loading, response, post } = useRequest({ url: '/api/console/users/create_blocklist' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Added to blocklist');
			router.push('/users/blocklist');
		}
	}, [response]);

	return (
		<CardWrapper label="Create Blocklist">
			<PageHeader title="Create Blocklist" />

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
						label="Note"
						value={form.values.note}
						onChange={(e) => form.setFieldValue('note', e.target.value)}
					/>
					<TextInput
						label="Address"
						value={form.values.address}
						onChange={(e) => form.setFieldValue('address', e.target.value)}
					/>
					<Button variant="outline" color="violet" type="submit">
						Submit
					</Button>
				</form>
			</div>
		</CardWrapper>
	);
};

export default Create;
