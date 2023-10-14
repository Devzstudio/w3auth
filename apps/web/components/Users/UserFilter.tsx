import { FilterIcon, XIcon } from '@heroicons/react/outline';
import FilterBadge from 'components/Users/FilterBadge';
import { useState } from 'react';
import { Popover, Button, Checkbox } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { useForm } from '@mantine/form';

import { TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import CollapseOption from 'components/UI/CollapseOption';
import FilterCondition from 'components/UI/FilterCondition';
import { urlParamsWithoutCondition } from 'lib/helpers';
import ConfigChains from 'lib/chains';
import dayjs from 'dayjs';

const UserFilter = () => {
	const [opened, setOpened] = useState(false);
	const router = useRouter();

	const form = useForm({
		initialValues: {
			chain: [],
			address: '',
			email: '',
			name: '',
			telegram: '',
			discord: '',
			twitter: '',
			last_login: null,
			created_at: null,
			last_login_condition: 'equals',
			created_at_condition: 'equals',
			address_condition: 'equals',
			email_condition: 'equals',
			name_condition: 'equals',
			telegram_condition: 'equals',
			discord_condition: 'equals',
			twitter_condition: 'equals',
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
				onChange={(val) => setOpened(val)}
				closeOnClickOutside={false}
			>
				<Popover.Target>
					<Button
						className="text-gray-500 hover:text-gray-100"
						color="violet"
						onClick={() => setOpened(!opened)}
					>
						<FilterIcon className="w-4 h-4 mr-2" />
						Filters
					</Button>
				</Popover.Target>
				<Popover.Dropdown className="p-0">
					<section className="text-gray-500 dark:text-gray-100 ">
						<div className="flex justify-between items-center px-4 py-2">
							<h4 className="font-medium">Filters</h4>

							<div className="flex items-center">
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

								<Button
									className={` text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-700 cursor-pointer`}
									onClick={() => setOpened(false)}
									variant="subtle"
									compact
									color="gray"
								>
									<XIcon className="w-3 h-3" />
								</Button>
							</div>
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
							<CollapseOption name="Chain">
								<div className="grid grid-cols-2 gap-2">
									{ConfigChains.map((chain) => {
										return (
											<Checkbox
												key={chain.symbol}
												color="violet"
												size="xs"
												checked={form.values.chain.includes(chain.symbol.toLocaleLowerCase())}
												label={chain.symbol}
												onChange={() => {
													const symbol = chain.symbol.toLocaleLowerCase();

													const dataExist = form.values.chain.includes(symbol);

													if (dataExist) {
														form.setFieldValue(
															'chain',
															form.values.chain.filter((c) => c !== symbol)
														);
													} else {
														form.setFieldValue('chain', [...form.values.chain, symbol]);
													}
												}}
											/>
										);
									})}
								</div>
							</CollapseOption>

							<CollapseOption name="Email">
								<FilterCondition
									value={form.values.email_condition}
									onChange={(val) => form.setFieldValue('email_condition', val)}
								/>

								<TextInput
									value={form.values.email}
									onChange={(e) => form.setFieldValue('email', e.target.value)}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="Name">
								<FilterCondition
									value={form.values.name_condition}
									onChange={(val) => form.setFieldValue('name_condition', val)}
								/>
								<TextInput
									value={form.values.name}
									onChange={(e) => form.setFieldValue('name', e.target.value)}
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
									value={form.values.created_at ? new Date(form.values.created_at) : null}
									onChange={(e) => form.setFieldValue('created_at', dayjs(e).format('YYYY-MM-DD'))}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="Last login">
								<FilterCondition
									value={form.values.last_login_condition}
									onChange={(val) => form.setFieldValue('last_login_condition', val)}
								/>
								<DatePicker
									value={form.values.last_login ? new Date(form.values.last_login) : null}
									onChange={(e) => form.setFieldValue('last_login', dayjs(e).format('YYYY-MM-DD'))}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="Telegram">
								<FilterCondition
									value={form.values.telegram_condition}
									onChange={(val) => form.setFieldValue('telegram_condition', val)}
								/>
								<TextInput
									value={form.values.name}
									onChange={(e) => form.setFieldValue('telegram', e.target.value)}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="Twitter">
								<FilterCondition
									value={form.values.twitter_condition}
									onChange={(val) => form.setFieldValue('twitter_condition', val)}
								/>
								<TextInput
									value={form.values.name}
									onChange={(e) => form.setFieldValue('twitter', e.target.value)}
									className="col-span-8"
									placeholder="value"
								/>
							</CollapseOption>

							<CollapseOption name="Discord">
								<FilterCondition
									value={form.values.discord_condition}
									onChange={(val) => form.setFieldValue('discord_condition', val)}
								/>
								<TextInput
									value={form.values.name}
									onChange={(e) => form.setFieldValue('discord', e.target.value)}
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

export default UserFilter;
