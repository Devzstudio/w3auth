import Link from 'next/link';

const IntegrationCard = ({ name, icon, description, link }) => {
	return (
		<div className="bg-dark-800 rounded px-2 py-2 border border-gray-800">
			<Link href={link} as={link}>
				<a className="flex items-center">
					<img src={icon} className="rounded" />
					<div className="flex-1 ml-2">
						<h3 className="text-base font-medium">{name}</h3>

						<p className="text-sm text-gray-500">{description}</p>
					</div>
				</a>
			</Link>
		</div>
	);
};

export default IntegrationCard;
