import { Button, Textarea, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { validateCookie } from 'lib/cookie';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.user_custom_field.findFirst({
			where: {
				field_id: context.query.profileFieldId,
			},
		});

		return {
			props: { record: JSON.stringify(records) },
		};
	});
};

const EditCustomProfileField = ({ record }) => {
	const field = JSON.parse(record);

	const router = useRouter();
	const form = useForm({
		initialValues: {
			id: router.query.profileFieldId,
			value: field.value,
		},
	});

	const { loading, response, post } = useRequest({ url: '/api/console/users/update_custom_field_value' });

	useEffect(() => {
		if (response?.success) {
			toast.success('User profile updated successfully');
			router.push(`/users`);
		}
	}, [response]);

	return (
		<CardWrapper label="Edit Field">
			<PageHeader title="Edit Field" />

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
						label="Value"
						value={form.values.value}
						onChange={(e) => form.setFieldValue('value', e.target.value)}
					/>

					<Button loading={loading} variant="outline" color="violet" type="submit">
						Submit
					</Button>
				</form>
			</div>
		</CardWrapper>
	);
};

export default EditCustomProfileField;
