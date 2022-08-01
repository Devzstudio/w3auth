import TokenGatingForm from 'components/Settings/TokenGatingForm';

const Create = () => {
	return (
		<TokenGatingForm
			label="Create Token Gating"
			url="/api/console/settings/create_token_gating"
			successMessage="Token Gating added successfully"
		/>
	);
};

export default Create;
