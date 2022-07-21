import { TextInput } from '@mantine/core';

const NFTCard = ({ label, contract, icon = null }) => {
	return (
		<div className="bg-dark-800 rounded p-5 col-span-3">
			<div className="grid grid-cols-12 gap-5">
				<h4 className="flex items-center text-gray-400 col-span-4">
					<img
						className="w-4 h-4 mr-2 rounded-full"
						src={icon ? icon : `/assets/crypto_icons/${label.toLocaleLowerCase()}.svg`}
					/>
					{label}
				</h4>
				<div className="col-span-8">
					<TextInput placeholder="Contract Address" value={contract} />
				</div>
			</div>
		</div>
	);
};

export default NFTCard;
