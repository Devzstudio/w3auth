import { Collapse } from '@mantine/core';
import { useState } from 'react';

const CollapseOption = ({ children, name }) => {
	const [opened, setOpened] = useState(false);

	return (
		<div className="bg-gray-50 dark:bg-dark-900  px-3 py-2 pb-2">
			<a
				className="text-sm w-full block cursor-pointer hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
				onClick={() => setOpened((o) => !o)}
			>
				{name}
			</a>

			<Collapse in={opened}>
				<div className="bg-white dark:bg-dark-700 rounded border dark:border-gray-900 px-1 py-2 space-y-2 mt-2">
					{children}
				</div>
			</Collapse>
		</div>
	);
};

export default CollapseOption;
