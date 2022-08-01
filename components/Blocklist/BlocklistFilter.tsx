import { FilterIcon } from '@heroicons/react/outline';
import FilterBadge from 'components/Users/FilterBadge';
import { useState } from 'react';
import { Popover, Button } from '@mantine/core';

import { useForm } from '@mantine/form';

import { TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import CollapseOption from 'components/UI/CollapseOption';
import FilterCondition from 'components/UI/FilterCondition';

const BlocklistFilter = () => {
	const [opened, setOpened] = useState(false);
	const router = useRouter();

	const form = useForm({
		initialValues: {
			address: '',
			address_condition: 'equals',
			note: '',
			note_condition: 'equals',
		},
	});

	return (
		<section className="flex items-center space-x-3">
			<FilterBadge />
			<Popover
				width={300}
				position="bottom-start"
				shadow="md"
				opened={opened}
				closeOnClickOutside
				onChange={(val) => setOpened(val)}
			>
				<Popover.Target>
					<Button
						className="text-gray-500 hover:text-gray-100"
						color="violet"
						onClick={() => setOpened(true)}
					>
						<FilterIcon className="w-4 h-4 mr-2" />
						Filters
					</Button>
				</Popover.Target>
				<Popover.Dropdown className="p-0">
					<section className="text-gray-500 dark:text-gray-100 ">
						<div className="flex justify-between items-center px-4 py-2">
							<h4 className="font-medium">Filters</h4>

							<Button
								onClick={() => {
									let urlQuery = '';

									Object.keys(form.values).forEach((key) => {
										if (form.values[key]) {
											if (key.includes('_')) {
												const conditionsSplit = key.split('_');
												if (urlQuery.includes(conditionsSplit[0])) {
													urlQuery += `${key}=${form.values[key]}&`;
												}
											} else {
												urlQuery += `${key}=${form.values[key]}&`;
											}
										}
									});

									router.push(`?${urlQuery}`);
									setOpened(false);
								}}
								variant="subtle"
							>
								Apply Filter
							</Button>
						</div>

						<div className="mt-3">
							<CollapseOption name="Address">
								<FilterCondition
									value={form.values.address_condition}
									onChange={(val) => form.setFieldValue('address_condition', val)}
								/>
								<TextInput
									value={form.values.address}
									onChange={(e) => form.setFieldValue('address', e.target.value)}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="Note">
								<FilterCondition
									value={form.values.note_condition}
									onChange={(val) => form.setFieldValue('note_condition', val)}
								/>
								<TextInput
									value={form.values.note}
									onChange={(e) => form.setFieldValue('note', e.target.value)}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>
						</div>
					</section>
				</Popover.Dropdown>
			</Popover>
		</section>
	);
};

export default BlocklistFilter;
