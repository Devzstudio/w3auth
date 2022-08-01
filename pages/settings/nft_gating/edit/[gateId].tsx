import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import { validateCookie } from 'lib/cookie';
import NFTGatingForm from 'components/Settings/NFTGatingForm';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.nft_gating.findFirst({
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
		<NFTGatingForm
			initialValues={{
				chain: field.chain,
				contract_address: field.contract_address,
				label: field.label,
				id: router.query.gateId,
			}}
			label="Edit NFT Gating"
			url="/api/console/settings/update_nft_gating"
			successMessage="NFT Gating updated successfully"
		/>
	);
};

export default Edit;
