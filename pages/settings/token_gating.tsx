import SettingsWrapper from 'components/settings/SettingsWrapper';
import { TextInput } from '@mantine/core';
import PageHeader from 'components/PageHeader';

const Settings = () => {
	return (
		<SettingsWrapper>
			<PageHeader title="NFT Gating" />

			<div className="space-y-5">
				Token gating. Does the user contains x amount of Y token? . Allow the user to login.
			</div>
		</SettingsWrapper>
	);
};

export default Settings;
