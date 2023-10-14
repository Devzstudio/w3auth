import NFTGatingForm from 'components/Settings/NFTGatingForm';

const Create = () => {
	return (
		<NFTGatingForm
			label="Create NFT Gating"
			url="/api/console/settings/create_nft_gating"
			successMessage="NFT Gating added successfully"
		/>
	);
};

export default Create;
