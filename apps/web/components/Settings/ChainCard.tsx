import { Switch } from '@mantine/core';

interface IChainCard {
	label: string;
	checked: boolean;
	onChange: (e) => void;
	icon?: string;
}

const ChainCard = ({ label, checked, onChange, icon = null }: IChainCard) => {
	return (
		<div className="bg-white border dark:border-transparent dark:bg-dark-800 rounded p-5 col-span-3">
			<div className="flex justify-between items-center">
				<h4 className="flex items-center text-gray-400">
					<img
						alt=""
						className="w-4 h-4 mr-2 rounded-full"
						src={icon ? icon : `/assets/crypto_icons/${label.toLocaleLowerCase()}.svg`}
					/>
					{label}
				</h4>
				<Switch color={'violet'} label="" onChange={onChange} checked={checked} />
			</div>
		</div>
	);
};

export default ChainCard;
