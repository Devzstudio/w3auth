import SettingsWrapper from 'components/settings/SettingsWrapper';
import { TextInput } from '@mantine/core';
import PageHeader from 'components/PageHeader';

const ChainCard = ({ label }) => {
	return (
		<div className="bg-dark-800 rounded p-5 col-span-3">
			<div className="grid grid-cols-12 gap-5">
				<h4 className="flex items-center text-gray-400 col-span-4">
					<img className="w-4 h-4 mr-2" src={`/assets/crypto_icons/${label.toLocaleLowerCase()}.svg`} />
					{label}
				</h4>
				<div className="col-span-8">
					<TextInput placeholder="Contract Address" />
				</div>
			</div>
		</div>
	);
};

const Settings = () => {
	return (
		<SettingsWrapper>
			<PageHeader title="NFT Gating" />

			<div className="space-y-5">
				<ChainCard label="ETH" />
				<ChainCard label="BNB" />
				<ChainCard label="FTM" />
				<ChainCard label="MATIC" />
				<ChainCard label="SOL" />
				<ChainCard label="GLMR" />
			</div>
		</SettingsWrapper>
	);
};

export default Settings;
