interface IHeading {
	heading: string;
	sub_heading?: string;
}

const Heading = ({ heading, sub_heading }: IHeading) => {
	return (
		<div className="mb-5">
			<h3 className="text-xl text-gray-900 dark:text-gray-100 font-medium">{heading}</h3>
			{sub_heading && <p className="text-sm text-gray-500 mt-2">{sub_heading}</p>}
		</div>
	);
};

export default Heading;
