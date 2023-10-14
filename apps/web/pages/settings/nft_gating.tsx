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
import Heading from 'components/UI/Heading';
import { getSettings } from 'lib/helpers';
import { Tooltip } from '@mantine/core';
import GatingStatus from 'components/UI/GatingStatus';

export const getServerSideProps: GetStaticProps = async (context: any) => {
	return validateCookie(context, async () => {
		let page;

		if (!context.query) page = 0;
		else {
			if (context?.query?.page) page = context?.query?.page - 1;
		}

		const settings = await prisma.settings.findMany({
			where: {
				name: {
					in: ['enable_nft_gating'],
				},
			},
		});

		const records = await prisma.nft_gating.findMany({
			skip: page ? page * Config.ItemsPerPage : 0,
			take: Config.ItemsPerPage,
		});

		const total = await prisma.nft_gating.count({});

		return {
			props: { records: JSON.stringify(records), total, settings },
		};
	});
};

const Settings = ({ records, total, settings }) => {
	const getRecords = JSON.parse(records);
	const setting = getSettings(settings);

	return (
		<SettingsWrapper>
			<PageHeader title="NFT Gating" />

			<Heading
				heading="NFT Gating"
				sub_heading="Users who possess any of the designated NFT items will be permitted access to the website if you activate NFT Gating."
			/>

			{setting.enable_nft_gating ? (
				<GatingStatus status={setting.enable_nft_gating} label="NFT Gating" />
			) : (
				<GatingStatus status={setting.enable_nft_gating} label="NFT Gating" />
			)}

			<div className="space-y-5">
				<div className="grid place-items-end">
					<Link href={'/settings/nft_gating/create'} passHref>
						<a className="text-base text-white bg-gray-500 dark:text-gray-100 dark:bg-dark-500 hover:bg-gray-600 px-4 py-2 rounded  dark:hover:text-gray-100 flex items-center">
							<PlusIcon className="w-4 h-4 mr-2" />
							New Record
						</a>
					</Link>
				</div>

				{getRecords.map((chain) => {
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
