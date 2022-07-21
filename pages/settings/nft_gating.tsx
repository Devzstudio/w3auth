import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';
import { getSettings } from 'lib/helpers';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import NFTCard from 'components/Settings/NFTCard';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import Config from 'lib/config';

export const getServerSideProps: GetStaticProps = async (params: any) => {
	let page;

	if (!params.query) page = 0;
	else {
		if (params?.query?.page) page = params?.query?.page - 1;
	}

	const records = await prisma.nft_gating.findMany({
		skip: page ? page * Config.ItemsPerPage : 0,
		take: Config.ItemsPerPage,
	});

	const total = await prisma.nft_gating.count({});

	return {
		props: { records: JSON.stringify(records), total },
	};
};

const Settings = ({ records }) => {
	const settings = getSettings(JSON.parse(records));

	console.log(settings);
	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_settings' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Updated settings');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<PageHeader title="NFT Gating" />

			<div className="space-y-5">
				<form
					onSubmit={() => {
						console.log(1);
					}}
				>
					{/* {settings.map((chain) => {
						return <NFTCard label={chain.chain} contract={chain.contract_address} icon={chain.icon} />;
					})} */}
				</form>
			</div>
		</SettingsWrapper>
	);
};

export default Settings;
