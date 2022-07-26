import { Button, Table, Textarea, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import useRequest from 'hooks/useRequests';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Create = () => {
	const [bulkInsert, setBulkInsert] = useState(false);

	const form = useForm({
		initialValues: {
			note: '',
			address: '',
			bulk: '',
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
				{bulkInsert ? (
					<>
						<form
							className="space-y-5"
							onSubmit={(e) => {
								e.preventDefault();

								post({
									...form.values,
								});
							}}
						>
							<Textarea
								value={form.values.bulk}
								onChange={(e) => form.setFieldValue('bulk', e.target.value)}
								label="Data"
								minRows={10}
								placeholder=""
							/>

							<div>
								<p className="text-gray-500 text-sm">Example:</p>
								<div className="text-xs text-gray-500">
									<p>0x000000000000000000000000000000000000dEaD Note</p>
									<p>0x000000000000000000000000000000000000dEaD Next note</p>
								</div>
							</div>

							<Button loading={loading} variant="outline" color="violet" type="submit">
								Submit
							</Button>
						</form>
					</>
				) : (
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
							label="Note"
							value={form.values.note}
							onChange={(e) => form.setFieldValue('note', e.target.value)}
						/>
						<TextInput
							color="violet"
							label="Address"
							value={form.values.address}
							onChange={(e) => form.setFieldValue('address', e.target.value)}
						/>
						<Button variant="outline" color="violet" type="submit">
							Submit
						</Button>
					</form>
				)}

				<a
					onClick={() => setBulkInsert(!bulkInsert)}
					className=" block mt-5 text-gray-500 cursor-pointer hover:text-gray-100 text-sm"
				>
					{bulkInsert ? 'Single item?' : 'Bulk insert?'}
				</a>
			</div>
		</CardWrapper>
	);
};

export default Create;
