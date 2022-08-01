import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/outline';

const CardWrapper = ({ children, label, create = null, options = null, noMargin = false }) => {
	return (
		<div
			className={`bg-white shadow dark:bg-dark-800 rounded pt-5 ${
				(label && label.includes('Create')) || (label && label.includes('Edit')) ? 'md:w-1/2' : ''
			}`}
		>
			<div className="flex justify-between items-center pr-5">
				<h4 className={`pl-3 text-xl ${noMargin ? '' : 'mb-5'} text-gray-900 dark:text-gray-100`}>{label}</h4>

				<div className="flex items-center space-x-5">
					{create && (
						<Link href={create.link} as={create.link}>
							<a className="text-base bg-gray-500 dark:text-gray-100 dark:bg-dark-500 hover:bg-gray-600 px-4 py-2 rounded  dark:hover:text-gray-100 flex items-center">
								<PlusIcon className="w-4 h-4 mr-2" />
								{create.label ?? 'New Record'}
							</a>
						</Link>
					)}

					{options}
				</div>
			</div>

			{children}
		</div>
	);
};

export default CardWrapper;
