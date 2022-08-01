import Link from 'next/link';

const IntegrationCard = ({ name, icon, description, link }) => {
	return (
		<div className="dark:bg-dark-800 bg-white rounded bg-gwhite px-2 py-2 border dark:border-gray-800">
			<Link href={link} passHref>
				<a className="flex items-center">
					<img src={icon} className="rounded" alt="" />
					<div className="flex-1 ml-2">
						<h3 className="text-base text-gray-900 dark:text-gray-100 font-medium">{name}</h3>

						<p className="text-sm text-gray-500">{description}</p>
					</div>
				</a>
			</Link>
		</div>
	);
};

export default IntegrationCard;
