import { Button, Switch, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { validateCookie } from 'lib/cookie';
import SettingsWrapper from 'components/Settings/SettingsWrapper';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.custom_fields.findFirst({
			where: {
				option_id: context.query.optionId,
			},
		});

		return {
			props: { record: JSON.stringify(records) },
		};
	});
};

const EditOption = ({ record }) => {
	const field = JSON.parse(record);

	const router = useRouter();
	const form = useForm({
		initialValues: {
			id: router.query.optionId,
			label: field.label,
			name: field.name,
			required: field.required,
		},
	});

	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_custom_field' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Custom field updated successfully');
			router.push('/settings/custom_fields');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<CardWrapper label="Edit Custom Field">
				<PageHeader title="Edit Custom Field" />

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

export default EditOption;
