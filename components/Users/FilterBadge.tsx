import { XIcon } from '@heroicons/react/outline';
import { ActionIcon, Badge } from '@mantine/core';
import { shortenAddress } from 'lib/helpers';
import { useRouter } from 'next/router';

const FilterBadge = () => {
	const router = useRouter();

	return (
		<>
			{Object.keys(router.query).map((key) => {
				if (!['page'].includes(key) && !key.includes('_condition'))
					return (
						<Badge
							key={key}
							color="gray"
							size="sm"
							radius="sm"
							rightSection={
								<ActionIcon
									onClick={() => {
										const routerParams = { ...router.query, page: 1 };
										delete routerParams[key];
										delete routerParams[`${key}_condition`];

										let urlQuery = '';

										Object.keys(routerParams).forEach((key) => {
											urlQuery += `${key}=${routerParams[key]}&`;
										});

										router.push('?' + urlQuery);
									}}
									size="xs"
									color="blue"
									radius="xl"
									variant="transparent"
								>
									<XIcon className="w-3 h-3" />
								</ActionIcon>
							}
						>
							{key} {router.query[`${key}_condition`]} :{' '}
							{key === 'address' ? shortenAddress(router.query[key]) : router.query[key]}
						</Badge>
					);
			})}
		</>
	);
};

export default FilterBadge;
