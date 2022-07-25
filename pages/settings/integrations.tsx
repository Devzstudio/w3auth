import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';
import IntegrationCard from 'components/Settings/IntegrationCard';

const Settings = () => {
	return (
		<SettingsWrapper>
			<PageHeader title="Integrations" />

			<div className="space-y-5 grid md:grid-cols-3 gap-5">
				<IntegrationCard
					name="Blockpass"
					description="KYC Integration for users"
					link="/settings/integrations/blockpass"
					icon="https://docs.blockpass.org/img/favicon.ico"
				/>
			</div>
		</SettingsWrapper>
	);
};

export default Settings;
