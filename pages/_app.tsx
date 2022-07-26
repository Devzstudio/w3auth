import Head from 'node_modules/next/head';
import Layout from '../components/Layout/index';
import { Toaster } from 'react-hot-toast';

import { WagmiConfig } from 'wagmi';
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chains, wagmiClient } from 'lib/connectors';
import { MantineProvider } from '@mantine/core';
import useDarkMode from 'use-dark-mode';
import ProgressBar from 'components/UI/progressbar';
import { AuthProvider } from 'context/auth.context';

import '@rainbow-me/rainbowkit/styles.css';
import 'react-tippy/dist/tippy.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const darkMode = useDarkMode(true, {
		classNameDark: 'dark',
	});

	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark',
				}}
				emotionOptions={{ key: 'mantine', prepend: false }}
			>
				<WagmiConfig client={wagmiClient}>
					<AuthProvider>
						<RainbowKitProvider chains={chains} theme={darkMode.value ? darkTheme() : lightTheme()}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</RainbowKitProvider>
					</AuthProvider>
				</WagmiConfig>
			</MantineProvider>
			<Toaster />
			<ProgressBar color="#e93dd0" />
		</>
	);
}

export default MyApp;
