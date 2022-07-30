import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { Button, TextInput } from '@mantine/core';
import useRequest from 'hooks/useRequests';
import Link from 'next/link';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const NFTCard = ({ label, chain, contract, icon = null, id }) => {
	const { loading, response, post } = useRequest({ url: '/api/console/settings/remove_nft_gating' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Removed contract address');
		}
	}, [response]);

	return (
		<div className="bg-white border dark:border-transparent dark:bg-dark-800 rounded p-5 col-span-3 text-gray-800 dark:text-gray-100">
			<div className="grid grid-cols-12 gap-5">
				<p className="col-span-2">{label} </p>
				<h4 className="flex items-center text-gray-400 col-span-2">
					<img
						className="w-4 h-4 mr-2 rounded-full"
						src={icon ? icon : `/assets/crypto_icons/${chain.toLocaleLowerCase()}.svg`}
					/>
					{chain.toUpperCase()}
				</h4>
				<div className="col-span-8 flex items-center space-x-3">
					<TextInput placeholder="Contract Address" value={contract} disabled className="flex-1 mr-5" />

					<Link href={`/settings/nft_gating/edit/${id}`} as={`/settings/nft_gating/edit/${id}`}>
						<a className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
							<PencilIcon className="w-4 h-4" />
						</a>
					</Link>

					<Button
						size="xs"
						loading={loading}
						variant="subtle"
						onClick={() =>
							post({
								id: id,
							})
						}
						color="gray"
						className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
					>
						<TrashIcon className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NFTCard;
