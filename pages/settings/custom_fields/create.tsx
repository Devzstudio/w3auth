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
			label: '',
			name: '',
			required: false,
		},
	});
	const router = useRouter();

	const { loading, response, post } = useRequest({ url: '/api/console/settings/create_custom_field' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Custom field added successfully');
			router.push('/settings/custom_fields');
		}
	}, [response]);

	return (
		<CardWrapper label="Create Custom Field">
			<PageHeader title="Create Custom Field" />

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
					<TextInput
						label="Name"
						placeholder="phone_number"
						value={form.values.name}
						onChange={(e) => form.setFieldValue('name', e.target.value)}
					/>

					<Switch
						color={'violet'}
						label="Required Field"
						checked={form.values.required}
						onChange={() => form.setFieldValue('required', !form.values.required)}
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
