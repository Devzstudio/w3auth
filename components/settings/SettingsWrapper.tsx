import Link from 'next/link';

const NavigationLinks = [
	{
		name: 'General',
		link: '/settings',
	},
	{
		name: 'Chains',
		link: '/settings/chains',
	},
	{
		name: 'NFT Gating',
		link: '/settings/nft_gating',
	},
	{
		name: 'Custom fields',
		link: '/settings/custom_fields',
	},
];

const SettingsWrapper = ({ children }) => {
	return (
		<div className="grid grid-cols-1 gap-5 md:grid-cols-12">
			<nav className="col-span-2">
				{NavigationLinks.map((nav) => (
					<Link as={nav.link} href={nav.link} key={nav.link}>
						<a className="text-sm block text-gray-500 hover:text-gray-100 hover:bg-dark-700 px-3 py-1.5 rounded cursor-pointer">
							{nav.name}
						</a>
					</Link>
				))}
			</nav>

			<div className="col-span-10">{children}</div>
		</div>
	);
};

export default SettingsWrapper;
