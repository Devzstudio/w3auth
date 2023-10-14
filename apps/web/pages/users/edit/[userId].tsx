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
		const records = await prisma.users.findFirst({
			where: {
				id: context.query.userId,
			},
		});

		return {
			props: { record: JSON.stringify(records) },
		};
	});
};

const EditUser = ({ record }) => {
	const field = JSON.parse(record);

	const router = useRouter();
	const form = useForm({
		initialValues: {
			id: router.query.userId,
			name: field.name,
			email: field.email,
			discord_username: field.discord_username,
			telegram_username: field.telegram_username,
			twitter_username: field.twitter_username,
			note: field.note,
		},
	});

	const { loading, response, post } = useRequest({ url: '/api/console/users/update_user' });

	useEffect(() => {
		if (response?.success) {
			toast.success('User profile updated successfully');
			router.push(`/users/details/${router.query.userId}`);
		}
	}, [response]);

	return (
		<CardWrapper label="Edit User">
			<PageHeader title="Edit User" />

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
						label="Email"
						value={form.values.email}
						onChange={(e) => form.setFieldValue('email', e.target.value)}
					/>

					<TextInput
						color="violet"
						label="Discord Username"
						value={form.values.discord_username}
						onChange={(e) => form.setFieldValue('discord_username', e.target.value)}
					/>

					<TextInput
						color="violet"
						label="Telegram Username"
						value={form.values.telegram_username}
						onChange={(e) => form.setFieldValue('telegram_username', e.target.value)}
					/>

					<TextInput
						color="violet"
						label="Twitter Username"
						value={form.values.twitter_username}
						onChange={(e) => form.setFieldValue('twitter_username', e.target.value)}
					/>

					<Textarea
						value={form.values.note}
						onChange={(e) => form.setFieldValue('note', e.target.value)}
						label="Note"
						minRows={3}
						placeholder=""
					/>

					<Button loading={loading} variant="outline" color="violet" type="submit">
						Submit
					</Button>
				</form>
			</div>
		</CardWrapper>
	);
};

export default EditUser;
