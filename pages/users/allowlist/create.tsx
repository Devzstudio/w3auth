import { Button, Textarea, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useForm } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Create = () => {
	const [bulkInsert, setBulkInsert] = useState(false);

	const form = useForm({
		initialValues: {
			label: '',
			address: '',
			bulk: '',
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
									<p>0x000000000000000000000000000000000000dEaD Burn</p>
									<p>0x000000000000000000000000000000000000dEaD Second user</p>
								</div>
							</div>

							<Button loading={loading} variant="outline" color="violet" type="submit">
								Submit
							</Button>
						</form>
					</>
				) : (
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
							<TextInput
								color="violet"
								label="Label"
								value={form.values.label}
								onChange={(e) => form.setFieldValue('label', e.target.value)}
							/>
							<TextInput
								color="violet"
								label="Address"
								value={form.values.address}
								onChange={(e) => form.setFieldValue('address', e.target.value)}
							/>
							<Button loading={loading} variant="outline" color="violet" type="submit">
								Submit
							</Button>
						</form>
					</>
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
