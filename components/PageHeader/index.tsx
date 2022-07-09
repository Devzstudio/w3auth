import Head from 'next/head';

const PageHeader = ({ title }) => {
	return (
		<>
			<Head>
				<title>w3auth - {title}</title>
			</Head>
		</>
	);
};

export default PageHeader;
