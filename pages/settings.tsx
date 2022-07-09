import SettingsWrapper from 'components/settings/SettingsWrapper';
import { Button, Switch } from '@mantine/core';
import CardWrapper from 'components/card/CardWrapper';
import PageHeader from 'components/PageHeader';

const Settings = () => {
	return (
		<SettingsWrapper>
			<PageHeader title="General Settings" />

			<CardWrapper label="General">
				<div className="px-2 py-4">
					<div className="flex items-center text-gray-500">
						Allow only allowlist users <Switch className="ml-5" />
					</div>
					<div className="mt-5 mb-5">
						<Button variant="outline" color="violet">
							Save
						</Button>
					</div>
				</div>
			</CardWrapper>
		</SettingsWrapper>
	);
};

export default Settings;
