import { Table } from '@mantine/core';
import CardWrapper from 'components/UI/card/CardWrapper';
import PageHeader from 'components/PageHeader';

const Users = () => {
	return (
		<CardWrapper label="User Details">
			<PageHeader title="User Details" />

			<div className="px-4">User details , custom fields data too.</div>
		</CardWrapper>
	);
};

export default Users;
