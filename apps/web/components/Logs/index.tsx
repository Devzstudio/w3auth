import { Table } from '@mantine/core';
import BrowserIcon from 'components/UI/BrowserIcon';
import Pagination from 'components/UI/pagination/Pagination';
import LogsFilter from 'components/Users/LogsFilter';
import countryFlag from 'data/CountryFlag';
import dayjs from 'dayjs';
import { isEmpty } from 'lib/helpers';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Logs = ({ logs, total, userRecords = true, hideFilter = false }) => {
	return (
		<>
			{!hideFilter && (
				<div className="px-3 mb-5">
					<LogsFilter />
				</div>
			)}

			<Table className="mt-5" striped highlightOnHover>
				<thead>
					<tr>
						{userRecords && <th>User</th>}
						<th>Browser</th>
						<th>IP</th>
						<th>Country</th>
						<th>Created at</th>
					</tr>
				</thead>
				<tbody>
					{logs.map((record) => {
						return (
							<tr key={record.id}>
								{userRecords && (
									<td>
										<Link href={`/users/details/${record.users.id}`}>
											<a>{record.users.name ?? record.users.id}</a>
										</Link>
									</td>
								)}
								<td>
									<BrowserIcon name={record.browser} />
								</td>
								<td>
									<CopyToClipboard text={record.ip} onCopy={() => toast.success('Copied')}>
										<span className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 cursor-copy">
											{record.ip}
										</span>
									</CopyToClipboard>
								</td>
								<td>
									<div className="flex items-center">
										{record.country && countryFlag[record.country.toLocaleUpperCase()] && (
											<img
												src={countryFlag[record.country.toLocaleUpperCase()]}
												className="w-4 h-4 mr-2"
												alt=""
											/>
										)}
										{record.country}
									</div>
								</td>
								<td>{dayjs(record.created_at).format('DD MMM YYYY h:m a')}</td>
							</tr>
						);
					})}

					{isEmpty(logs) && (
						<tr>
							<td colSpan={userRecords ? 5 : 4}>There are no records.</td>
						</tr>
					)}
				</tbody>
			</Table>
			<Pagination total={total} />
		</>
	);
};

export default Logs;
