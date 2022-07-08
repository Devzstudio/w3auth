const CardWrapper = ({ children, label }) => {
	return (
		<div className="bg-dark-800 rounded pt-5">
			<h4 className="pl-3 text-xl mb-5">{label}</h4>

			{children}
		</div>
	);
};

export default CardWrapper;
