import Head from 'next/head';

const PageHeader = ({ title }: { title: string }) => {
	return (
		<>
			<Head>
				<title>w3auth - {title}</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
				<link rel="manifest" href="/assets/favicon/site.webmanifest"></link>
			</Head>
		</>
	);
};

export default PageHeader;
