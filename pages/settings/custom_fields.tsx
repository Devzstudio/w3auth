import SettingsWrapper from 'components/settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';

const Settings = () => {
	return (
		<SettingsWrapper>
			<PageHeader title="Custom Fields" />

			<div className="space-y-5">custom profile fields.</div>
		</SettingsWrapper>
	);
};

export default Settings;
