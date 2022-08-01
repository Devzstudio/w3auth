import TeamMemberForm from 'components/Settings/TeamMemberForm';

const Create = () => {
	return (
		<TeamMemberForm
			label="Create Team Member"
			successMessage={'Team member added successfully'}
			url="/api/console/settings/create_team_member"
		/>
	);
};

export default Create;
