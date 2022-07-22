import {
	BanIcon,
	ClipboardCheckIcon,
	CogIcon,
	HomeIcon,
	InformationCircleIcon,
	UsersIcon,
} from '@heroicons/react/outline';
import RabbitKitConnect from 'components/Rainbowkit/RainbowKit';
import { useAuth } from 'context/auth.context';
import useIsAuthenticated from 'hooks/auth/useIsAuthenticated';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavigationLinks = [
	{
		name: 'Dashboard',
		link: '/dashboard',
		icon: <HomeIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Users',
		link: '/users',
		icon: <UsersIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Allowlist',
		link: '/users/allowlist',
		icon: <ClipboardCheckIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Blocklist',
		link: '/users/blocklist',
		icon: <BanIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Settings',
		link: '/settings',
		icon: <CogIcon className="w-4 h-4 mr-2" />,
	},
];

const Layout = ({ children }) => {
	const { auth } = useAuth();
	const router = useRouter();
	useIsAuthenticated();

	return (
		<div className="bg-dark-900 text-gray-100 min-h-screen">
			<header className={`${auth.token ? 'border-b-2' : ''} md:px-5 pt-5 border-dark-800`}>
				<div className="mx-auto max-w-screen-xl md:px-4 sm:px-6 relative">
					<nav className="flex justify-between">
						{/* <img src="/logo.svg" /> */}
						<span className="text-xl font-medium pl-3">
							<span className="text-gray-500 mr-1">w3</span>
							auth
						</span>

						<RabbitKitConnect />
					</nav>

					{auth.token && (
						<div className="my-5 space-x-5 flex items-center w-full">
							{NavigationLinks.map((nav) => (
								<Link as={nav.link} href={nav.link} key={nav.link}>
									<a
										className={`text-sm text-gray-500 hover:text-gray-100 hover:bg-dark-700 px-3 py-1.5 rounded cursor-pointer flex items-center ${
											router.asPath == nav.link ? 'text-purple-500' : ''
										} ${
											nav.link === '/settings' && router.asPath.includes('settings')
												? 'text-purple-500'
												: ''
										}`}
									>
										{nav.icon} {nav.name}
									</a>
								</Link>
							))}

							<a
								target="_BLANK"
								rel="noreferrer noopener"
								href="https://w3auth.devzstudio.com"
								className={`text-sm text-gray-500 hover:text-gray-100 hover:bg-dark-700 px-3 py-1.5 rounded cursor-pointer flex items-center documentation_link`}
							>
								<InformationCircleIcon className="w-4 h-4 mr-2" />
								Documentation
							</a>
						</div>
					)}
				</div>
			</header>
			<div className="mx-auto max-w-screen-xl px-4 sm:px-6 relative mt-5">
				<main>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
