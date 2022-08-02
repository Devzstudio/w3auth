import { FilterIcon } from '@heroicons/react/outline';
import FilterBadge from 'components/Users/FilterBadge';
import { useState } from 'react';
import { Popover, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { useForm } from '@mantine/form';

import { TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import CollapseOption from 'components/UI/CollapseOption';
import FilterCondition from 'components/UI/FilterCondition';
import { urlParamsWithoutCondition } from 'lib/helpers';

const LogsFilter = () => {
	const [opened, setOpened] = useState(false);
	const router = useRouter();

	const form = useForm({
		initialValues: {
			browser: '',
			ip: '',
			country: '',
			created_at: null,
			created_at_condition: 'equals',
			browser_condition: 'equals',
			ip_condition: 'equals',
			country_condition: 'equals',
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
								size="xs"
								onClick={() => {
									const urlQuery = urlParamsWithoutCondition(form.values);

									router.push(`?${urlQuery}`);
									setOpened(false);
								}}
								variant="subtle"
							>
								Apply Filter
							</Button>
						</div>

						<div className="mt-3">
							<CollapseOption name="Browser">
								<FilterCondition
									value={form.values.browser_condition}
									onChange={(val) => form.setFieldValue('browser_condition', val)}
								/>
								<TextInput
									value={form.values.browser}
									onChange={(e) => form.setFieldValue('browser', e.target.value)}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="IP">
								<FilterCondition
									value={form.values.ip_condition}
									onChange={(val) => form.setFieldValue('ip_condition', val)}
								/>

								<TextInput
									value={form.values.ip}
									onChange={(e) => form.setFieldValue('ip', e.target.value)}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="Country">
								<FilterCondition
									value={form.values.country_condition}
									onChange={(val) => form.setFieldValue('country_condition', val)}
								/>
								<TextInput
									value={form.values.country}
									onChange={(e) => form.setFieldValue('country', e.target.value)}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="Created at">
								<FilterCondition
									value={form.values.created_at_condition}
									onChange={(val) => form.setFieldValue('created_at_condition', val)}
								/>
								<DatePicker
									value={form.values.created_at}
									onChange={(e) => form.setFieldValue('created_at', e)}
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

export default LogsFilter;
