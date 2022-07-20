import RabbitKitConnect from 'components/Rainbowkit/RainbowKit';
import Link from 'next/link';

const NavigationLinks = [
	{
		name: 'Dashboard',
		link: '/dashboard',
	},
	{
		name: 'Users',
		link: '/users',
	},
	{
		name: 'Allowlist',
		link: '/users/allowlist',
	},
	{
		name: 'Blocklist',
		link: '/users/blocklist',
	},
	{
		name: 'Settings',
		link: '/settings',
	},
];

const Layout = ({ children }) => {
	return (
		<div className="bg-dark-900 text-gray-100 min-h-screen">
			<header className="border-b-2 px-5 pt-5 border-dark-800">
				<div className="mx-auto max-w-screen-xl px-4 sm:px-6 relative">
					<nav className="flex justify-between">
						{/* <img src="/logo.svg" /> */}
						<span className="text-xl font-medium pl-3">
							<span className="text-gray-500 mr-1">w3</span>
							auth
						</span>

						<RabbitKitConnect />
					</nav>

					<div className="my-5 space-x-5">
						{NavigationLinks.map((nav) => (
							<Link as={nav.link} href={nav.link} key={nav.link}>
								<a className="text-sm text-gray-500 hover:text-gray-100 hover:bg-dark-700 px-3 py-1.5 rounded cursor-pointer">
									{nav.name}
								</a>
							</Link>
						))}
					</div>
				</div>
			</header>
			<div className="mx-auto max-w-screen-xl px-4 sm:px-6 relative mt-5">
				<main>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
