import { Button, Table, TextInput } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';

const Create = () => {
	return (
		<CardWrapper label="Create Allowlist">
			<PageHeader title="Create Allowlist" />

			<div className="px-3 pb-5">
				<form className="space-y-5 md:w-1/2">
					<TextInput label="Label" />
					<TextInput label="Address" />
					<Button variant="outline" color="violet">
						Submit
					</Button>
				</form>
			</div>
		</CardWrapper>
	);
};

export default Create;
