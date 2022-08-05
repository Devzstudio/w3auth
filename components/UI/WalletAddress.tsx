import { ChainLogo } from 'lib/chains';
import { shortenAddress, walletExplore } from 'lib/helpers';
import toast from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from '@mantine/core';

const WalletAddress = ({ address, chain = null, hideChainLogo = false, shortAddress = false }) => {
	return (
		<div className="flex items-center">
			<Tooltip position="top-start" label={`${address}`} withArrow>
				<a href={walletExplore(chain, address)} target="_BLANK" rel="noreferrer noopener">
					{chain && !hideChainLogo && (
						<img src={ChainLogo[chain.toUpperCase()]} className="w-4 h-4 mr-2 rounded-full" alt="" />
					)}
				</a>
			</Tooltip>
			<CopyToClipboard text={address} onCopy={() => toast.success('Copied')}>
				<span className="cursor-copy">{shortAddress ? shortenAddress(address) : address}</span>
			</CopyToClipboard>
		</div>
	);
};

export default WalletAddress;
