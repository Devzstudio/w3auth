import { Button, Switch, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import SettingsWrapper from 'components/Settings/SettingsWrapper';

const CustomFieldsForm = ({ url, initialValues = {}, label, successMessage }) => {
	const form = useForm({
		initialValues: {
			label: '',
			name: '',
			required: false,
			...initialValues,
		},
	});
	const router = useRouter();

	const { loading, response, post } = useRequest({ url });

	useEffect(() => {
		if (response?.success) {
			toast.success(successMessage);
			router.push('/settings/custom_fields');
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
						<TextInput
							color="violet"
							label="Name"
							placeholder="field_name"
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
		</SettingsWrapper>
	);
};

export default CustomFieldsForm;
