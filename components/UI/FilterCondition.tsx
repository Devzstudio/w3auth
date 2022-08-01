import { Select } from '@mantine/core';

const FilterCondition = ({ value, onChange }) => {
	return (
		<Select
			value={value}
			color="violet"
			onChange={onChange}
			data={[
				{ label: 'equals', value: 'equals' },
				{ label: 'in', value: 'in' },
				{ label: 'notIn', value: 'notIn' },
				{ label: 'lte', value: 'lte' },
				{ label: 'gte', value: 'gte' },
				{ label: 'contains', value: 'contains' },
				{ label: 'startsWith', value: 'startsWith' },
				{ label: 'endsWith', value: 'endsWith' },
				{ label: 'not', value: 'not' },
			]}
		></Select>
	);
};

export default FilterCondition;
