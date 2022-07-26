import { forwardRef } from 'react';
import { MultiSelect, MultiSelectProps, Box, CloseButton, SelectItemProps, MultiSelectValueProps } from '@mantine/core';
import CountriesData from 'data/Countries';
import countryFlag from 'data/CountryFlag';

function Value({ value, label, onRemove, classNames, ...others }: MultiSelectValueProps & { value: string }) {
	const Flag = countryFlag[value];
	return (
		<div {...others}>
			<Box
				sx={(theme) => ({
					display: 'flex',
					cursor: 'default',
					alignItems: 'center',
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
					border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]}`,
					paddingLeft: 10,
					borderRadius: 4,
				})}
			>
				<Box mr={10}>
					<img src={Flag} className="w-4 h-4" alt="" />
				</Box>
				<Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
				<CloseButton onMouseDown={onRemove} variant="transparent" size={22} iconSize={14} tabIndex={-1} />
			</Box>
		</div>
	);
}

const Item = forwardRef<HTMLDivElement, SelectItemProps>(({ label, value, ...others }, ref) => {
	const Flag = countryFlag[value];
	return (
		<div ref={ref} {...others}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box mr={10}>
					<img src={Flag} className="w-4 h-4" alt="" />
				</Box>
				<div>{label}</div>
			</Box>
		</div>
	);
});

Item.displayName = 'SelectItem';

const CountrySelect = (props: Partial<MultiSelectProps>) => {
	return (
		<MultiSelect
			data={CountriesData}
			limit={20}
			valueComponent={Value}
			itemComponent={Item}
			searchable
			value={props.value}
			onChange={props.onChange}
			label={props.label}
			{...props}
		/>
	);
};

export default CountrySelect;
