import React from 'react';

const Icon = ({ name }) => {
	if (name.includes('chrome'))
		return <img src="https://cdn.svgporn.com/logos/chrome.svg" className="mr-2" width="20px" alt="" />;

	if (name.includes('firefox'))
		return <img src="https://cdn.svgporn.com/logos/firefox.svg" className="mr-2" width="20px" alt="" />;

	if (name.includes('edge'))
		return <img src="https://cdn.svgporn.com/logos/microsoft-edge.svg" className="mr-2" width="20px" alt="" />;

	if (name.includes('safari'))
		return <img src="https://cdn.svgporn.com/logos/safari.svg" className="mr-2" width="20px" alt="" />;

	if (name.includes('opera'))
		return <img src="https://cdn.svgporn.com/logos/opera.svg" className="mr-2" width="20px" alt="" />;

	if (name.includes('internetexplorer'))
		return <img src="https://cdn.svgporn.com/logos/internetexplorer.svg" className="mr-2" width="20px" alt="" />;

	return null;
};

const BrowserIcon = ({ name }) => {
	return (
		<div className="flex items-center">
			<Icon name={name.toLowerCase()} />
			{name}
		</div>
	);
};

export default BrowserIcon;
