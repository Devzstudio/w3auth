import { Tooltip } from '@mantine/core';

const GatingStatus = ({ status, label }) => {
	return (
		<Tooltip label={`You can ${status ? 'disable' : 'enable'} it from Settings -> General`} withArrow>
			<div className=" flex items-center text-gray-500 text-sm w-max">
				<div className={`w-4 h-4 ${status ? 'bg-green-500' : 'bg-red-500'}  mr-2 rounded-full`}></div>
				{label} is {!status ? 'disabled' : 'enabled'}.
			</div>
		</Tooltip>
	);
};

export default GatingStatus;
