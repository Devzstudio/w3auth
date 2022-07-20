import Link from 'next/link';

const CardWrapper = ({ children, label, create = null }) => {
	return (
		<div className="bg-dark-800 rounded pt-5">
			<div className="flex justify-between items-center pr-5">
				<h4 className="pl-3 text-xl mb-5">{label}</h4>

				{create && (
					<Link href={create.link} as={create.link}>
						<a className="text-base dark:hover:bg-gray-800 px-3 py-2 rounded dark:text-gray-500 dark:hover:text-gray-100">
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
