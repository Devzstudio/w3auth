import CustomFieldsForm from 'components/Settings/CustomFieldsForm';

const Create = () => {
	return (
		<CustomFieldsForm
			url="/api/console/settings/create_custom_field"
			label={'Create Custom Field'}
			successMessage="Custom field added successfully"
		/>
	);
};

export default Create;
