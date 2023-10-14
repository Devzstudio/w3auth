import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import { validateCookie } from 'lib/cookie';
import TeamMemberForm from 'components/Settings/TeamMemberForm';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		const records = await prisma.admins.findFirst({
			where: {
				admin_id: context.query.adminId,
			},
		});

		return {
			props: { record: JSON.stringify(records) },
		};
	});
};

const Edit = ({ record }) => {
	const router = useRouter();
	const user = JSON.parse(record);

	return (
		<TeamMemberForm
			initialValues={{
				id: router.query.adminId,
				wallet_address: user.wallet_address,
				name: user.name,
			}}
			label="Edit Team Member"
			successMessage={'Team member edited successfully'}
			url="/api/console/settings/update_team_member"
		/>
	);
};

export default Edit;
