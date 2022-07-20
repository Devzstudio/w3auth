import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';

const Settings = () => {
	return (
		<SettingsWrapper>
			<PageHeader title="Custom Fields" />

			<div className="space-y-5">
				custom profile fields. two modes: let user fill profile along with registeration process. || login and
				fill profile details later.
				<p>custom fields are shown here.</p>
			</div>
		</SettingsWrapper>
	);
};

export default Settings;
