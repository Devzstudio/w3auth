const StatsCard = ({ label, value }) => {
	return (
		<div className="bg-gray-100 dark:bg-dark-900 rounded p-5 col-span-3">
			<div className="flex justify-between items-center">
				<span className="mr-2 text-xl text-gray-900 dark:text-gray-100">{value}</span>
				<h4 className="flex items-center text-gray-400">{label}</h4>
			</div>
		</div>
	);
};

export default StatsCard;
