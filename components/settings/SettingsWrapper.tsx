import {
	AdjustmentsIcon,
	CogIcon,
	CubeTransparentIcon,
	DocumentTextIcon,
	FingerPrintIcon,
	PhotographIcon,
	UsersIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavigationLinks = [
	{
		name: 'General',
		link: '/settings',
		icon: <CogIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Chains',
		link: '/settings/chains',
		icon: <CubeTransparentIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'NFT Gating',
		link: '/settings/nft_gating',
		icon: <PhotographIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Token Gating',
		link: '/settings/token_gating',
		icon: <FingerPrintIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Custom fields',
		link: '/settings/custom_fields',
		icon: <DocumentTextIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Team',
		link: '/settings/team',
		icon: <UsersIcon className="w-4 h-4 mr-2" />,
	},
	{
		name: 'Integrations',
		link: '/settings/integrations',
		icon: <AdjustmentsIcon className="w-4 h-4 mr-2" />,
	},
];

const SettingsWrapper = ({ children }) => {
	const router = useRouter();

	return (
		<div className="grid grid-cols-1 gap-5 md:grid-cols-12">
			<nav className="col-span-2 space-y-2">
				{NavigationLinks.map((nav) => (
					<Link as={nav.link} href={nav.link} key={nav.link}>
						<a
							className={`text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-700 px-3 py-1.5 rounded cursor-pointer flex items-center
							${router.asPath == nav.link ? 'text-purple-500' : ''}
						`}
						>
							{nav.icon} {nav.name}
						</a>
					</Link>
				))}
			</nav>

			<div className="col-span-10">{children}</div>
		</div>
	);
};

export default SettingsWrapper;
