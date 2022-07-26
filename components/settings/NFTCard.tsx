import { PencilIcon } from '@heroicons/react/outline';
import { TextInput } from '@mantine/core';
import Link from 'next/link';

const NFTCard = ({ label, chain, contract, icon = null, id }) => {
	return (
		<div className="bg-dark-800 rounded p-5 col-span-3">
			<div className="grid grid-cols-12 gap-5">
				<p className="col-span-2">{label} </p>
				<h4 className="flex items-center text-gray-400 col-span-2">
					<img
						className="w-4 h-4 mr-2 rounded-full"
						src={icon ? icon : `/assets/crypto_icons/${chain.toLocaleLowerCase()}.svg`}
					/>
					{chain.toUpperCase()}
				</h4>
				<div className="col-span-8 flex items-center">
					<TextInput placeholder="Contract Address" value={contract} disabled className="flex-1 mr-5" />

					<Link href={`/settings/nft_gating/edit/${id}`} as={`/settings/nft_gating/edit/${id}`}>
						<a className="text-gray-500 hover:text-gray-100">
							<PencilIcon className="w-4 h-4" />
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NFTCard;
