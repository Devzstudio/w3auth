import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/outline';

const CardWrapper = ({ children, label, create = null }) => {
	return (
		<div
			className={`bg-dark-800 rounded pt-5 ${
				label.includes('Create') || label.includes('Edit') ? 'md:w-1/2' : ''
			}`}
		>
			<div className="flex justify-between items-center pr-5">
				<h4 className="pl-3 text-xl mb-5">{label}</h4>

				{create && (
					<Link href={create.link} as={create.link}>
						<a className="text-base bg-dark-700 dark:hover:bg-gray-800 px-4 py-2 rounded dark:text-gray-500 dark:hover:text-gray-100 flex items-center">
							<PlusIcon className="w-4 h-4 mr-2" />
							{create.label ?? 'New Record'}
						</a>
					</Link>
				)}
			</div>

			{children}
		</div>
	);
};

export default CardWrapper;
