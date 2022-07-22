import { Button } from '@mantine/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useNounceHandler from 'hooks/auth/useNounceHandler';
import { shortenAddress } from 'lib/helpers';
import React from 'react';

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
							className="text-sm text-gray-500 hover:text-gray-100 hover:bg-dark-700 px-3 py-1.5 rounded cursor-pointer"
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
	useNounceHandler({
		account,
	});

	return (
		<>
			<div className="flex items-center bg-gray-100 dark:bg-dark-700 rounded px-3 py-1 divide-x divide-gray-700">
				{chain.iconUrl && (
					<img
						onClick={() => {
							openChainModal();
						}}
						className="text-sm flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-900 rounded cursor-pointer  mr-2"
						alt={chain.name ?? 'Chain icon'}
						src={chain.iconUrl}
						style={{ width: 18, height: 18 }}
					/>
				)}
				<a
					className="text-sm flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-900 rounded p-1 px-2 cursor-pointer"
					onClick={() => {
						openAccountModal();
					}}
				>
					{shortenAddress(account.address)} {account.displayBalance ? ` (${account.displayBalance})` : ''}
				</a>
			</div>
		</>
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
