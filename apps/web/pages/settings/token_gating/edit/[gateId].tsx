import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import { validateCookie } from 'lib/cookie';
import TokenGatingForm from 'components/Settings/TokenGatingForm';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.token_gating.findFirst({
			where: {
				id: context.query.gateId,
			},
		});

		return {
			props: { record: JSON.stringify(records) },
		};
	});
};

const Edit = ({ record }) => {
	const field = JSON.parse(record);

	const router = useRouter();

	return (
		<TokenGatingForm
			initialValues={{
				label: field.label,
				chain: field.chain,
				contract_address: field.contract_address,
				value: field.value,
				id: router.query.gateId,
			}}
			label="Edit Token Gating"
			url="/api/console/settings/update_token_gating"
			successMessage="Token Gating updated successfully"
		/>
	);
};

export default Edit;
