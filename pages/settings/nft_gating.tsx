import SettingsWrapper from 'components/Settings/SettingsWrapper';
import PageHeader from 'components/PageHeader';
import useRequest from 'hooks/useRequests';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import NFTCard from 'components/Settings/NFTCard';
import { GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import Config from 'lib/config';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/outline';
import Pagination from 'components/UI/pagination/Pagination';
import { validateCookie } from 'lib/cookie';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const records = await prisma.nft_gating.findMany({
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
		});

		const total = await prisma.nft_gating.count({});

		return {
			props: { records: JSON.stringify(records), total },
		};
	});
};

const Settings = ({ records, total }) => {
	const settings = JSON.parse(records);

	const { loading, response, post } = useRequest({ url: '/api/console/settings/update_settings' });

	useEffect(() => {
		if (response?.success) {
			toast.success('Updated settings');
		}
	}, [response]);

	return (
		<SettingsWrapper>
			<PageHeader title="NFT Gating" />

			<div className="space-y-5">
				<div className="grid place-items-end">
					<Link href={'/settings/nft_gating/create'} as={'/settings/nft_gating/create'}>
						<a className="text-base bg-dark-700 dark:hover:bg-gray-800 px-4 py-2 rounded dark:text-gray-500 dark:hover:text-gray-100 flex items-center">
							<PlusIcon className="w-4 h-4 mr-2" />
							New Record
						</a>
					</Link>
				</div>

				{settings.map((chain) => {
					return (
						<NFTCard
							key={chain.id}
							label={chain.label}
							chain={chain.chain}
							contract={chain.contract_address}
							icon={chain.icon}
							id={chain.id}
						/>
					);
				})}

				<Pagination total={total} />
			</div>
		</SettingsWrapper>
	);
};

export default Settings;
