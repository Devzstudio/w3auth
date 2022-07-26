import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import PageHeader from 'components/PageHeader';
import { useAuth } from 'context/auth.context';
import { useRouter } from 'next/router';

export default function Home() {
	const { auth } = useAuth();
	const router = useRouter();
	const { openConnectModal } = useConnectModal();

	return (
		<section className="grid place-items-center min-h-screen">
			<PageHeader title="w3auth" />
			<div className="bg-dark-700 px-5 py-3 rounded-xl pb-5 grid place-items-center w-72">
				{auth.token == '' ? (
					<>
						<LockClosedIcon className="w-20 h-20 mt-10 mb-10 text-dark-900" />
						<p className="text-xl mt-5 mb-5">Login to continue</p>
						<p className="text-gray-500 text-sm mb-10">Login is only permitted to authorized users </p>

						<a
							onClick={openConnectModal}
							className="bg-gray-100 hover:bg-gray-300 cursor-pointer text-gray-900 rounded w-full text-center py-2"
						>
							Connect wallet
						</a>
					</>
				) : (
					<>
						<LockOpenIcon className="w-20 h-20 mt-10 mb-10 text-dark-900" />
						<p className="text-gray-500 text-sm mb-10">Your account is already logged in.</p>

						<a
							onClick={() => {
								router.push('/dashboard');
							}}
							className="bg-gray-100 hover:bg-gray-300 cursor-pointer text-gray-900 rounded w-full text-center py-2"
						>
							Take me to dashboard
						</a>
					</>
				)}
			</div>
		</section>
	);
}
