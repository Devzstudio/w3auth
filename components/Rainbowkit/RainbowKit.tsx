import { LogoutIcon, MoonIcon } from '@heroicons/react/outline';
import { Button } from '@mantine/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AuthActionTypes, useAuth } from 'context/auth.context';
import useNonceHandler from 'hooks/auth/useNonceHandler';
import useRequest from 'hooks/useRequests';
import { shortenAddress } from 'lib/helpers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import { useDisconnect } from 'wagmi';

const ConnectOptionsHandler = ({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
	return (
		<div
			{...(!mounted && {
				'aria-hidden': true,
				style: {
					opacity: 0,
					pointerEvents: 'none',
					userSelect: 'none',
				},
			})}
		>
			{(() => {
				if (!mounted || !account || !chain) {
					return (
						<Button
							size="sm"
							onClick={openConnectModal}
							compact
							variant="subtle"
							className="text-sm dark:text-gray-500 dark:hover:text-gray-100 hover:bg-dark-700 px-3 py-1.5 rounded cursor-pointer"
						>
							Connect Wallet
						</Button>
					);
				}

				if (chain.unsupported) {
					return (
						<Button
							size="sm"
							onClick={openChainModal}
							compact
							variant="subtle"
							className="text-sm text-gray-500 hover:text-gray-100 hover:bg-dark-700 px-3 py-1.5 rounded cursor-pointer"
						>
							Wrong network
						</Button>
					);
				}

				if (!account) return null;

				return (
					<>
						<ConnectedAddress
							chain={chain}
							openChainModal={openChainModal}
							openAccountModal={openAccountModal}
							account={account}
						/>
					</>
				);
			})()}
		</div>
	);
};

const ConnectedAddress = ({ chain, openChainModal, openAccountModal, account }) => {
	const { loading, post, response } = useRequest({ url: '/api/console/auth/logout' });
	const router = useRouter();

	const { auth, authDispatch } = useAuth();
	const { disconnect } = useDisconnect();

	useNonceHandler({
		account,
	});

	useEffect(() => {
		if (response) {
			authDispatch({
				type: AuthActionTypes.LOGOUT,
			});

			window.localStorage.removeItem('refresh_token');
			disconnect();
			router.push('/');
		}
	}, [response]);

	return (
		<div className="flex items-center">
			<div className="flex items-center border dark:border-transparent bg-gray-50 dark:bg-dark-700 rounded px-3 py-1 divide-x dark:divide-gray-700 mr-2">
				{chain.iconUrl && (
					<img
						className="text-sm flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-900 rounded  mr-2"
						alt={chain.name ?? 'Chain icon'}
						src={chain.iconUrl}
						style={{ width: 18, height: 18 }}
					/>
				)}
				<a className="text-sm flex items-center justify-center text-gray-500 dark:text-gray-400  rounded p-1 px-2">
					{shortenAddress(account.address)} {account.displayBalance ? ` (${account.displayBalance})` : ''}
				</a>
			</div>

			<Button loading={loading} onClick={() => post({})} variant="subtle" compact color="gray">
				<LogoutIcon className="w-4 h-4" />
			</Button>
		</div>
	);
};

const RabbitKitConnect = () => {
	return (
		<ConnectButton.Custom>
			{({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
				return (
					<ConnectOptionsHandler
						account={account}
						chain={chain}
						openAccountModal={openAccountModal}
						openChainModal={openChainModal}
						openConnectModal={openConnectModal}
						mounted={mounted}
					/>
				);
			}}
		</ConnectButton.Custom>
	);
};

export default RabbitKitConnect;
