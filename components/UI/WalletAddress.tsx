import { ChainLogo } from 'lib/chains';
import { shortenAddress } from 'lib/helpers';

const WalletAddress = ({ address, chain, hideChainLogo = false, shortAddress = false }) => {
	return (
		<div className="flex items-center">
			{chain && !hideChainLogo && <img src={ChainLogo[chain.toUpperCase()]} className="w-4 h-4 mr-2" />}

			{shortAddress ? shortenAddress(address) : address}
		</div>
	);
};

export default WalletAddress;
