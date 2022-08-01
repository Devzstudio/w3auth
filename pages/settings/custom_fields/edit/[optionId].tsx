import { useRouter } from 'next/router';
import prisma from 'lib/prisma';
import { GetStaticProps } from 'next';
import { validateCookie } from 'lib/cookie';
import CustomFieldsForm from 'components/Settings/CustomFieldsForm';

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

	return (
		<CustomFieldsForm
			url="/api/console/settings/update_custom_field"
			label={'Edit Custom Field'}
			initialValues={{
				id: router.query.optionId,
				label: field.label,
				name: field.name,
				required: field.required,
			}}
			successMessage="Custom field updated successfully"
		/>
	);
};

export default EditOption;
