import Head from 'node_modules/next/head';
import Layout from '../components/Layout/index';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

import { WagmiConfig } from 'wagmi';
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chains, wagmiClient } from 'lib/connectors';
import { MantineProvider } from '@mantine/core';
import useDarkMode from 'use-dark-mode';
import ProgressBar from 'components/UI/progressbar';

function MyApp({ Component, pageProps }) {
	const darkMode = useDarkMode(true, {
		classNameDark: 'dark',
	});

	return (
		<Layout>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} theme={darkMode.value ? darkTheme() : lightTheme()}>
					<MantineProvider
						theme={{
							// colorScheme: darkMode.value ? 'dark' : 'light',
							colorScheme: 'dark',
						}}
					>
						<Component {...pageProps} />
					</MantineProvider>
				</RainbowKitProvider>
			</WagmiConfig>
			<Toaster />
			<ProgressBar color="#e93dd0" />
		</Layout>
	);
}

export default MyApp;
