import Head from 'next/head';
import Layout from 'components/Layout/index';
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
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: darkMode.value ? 'dark' : 'light',
				}}
			>
				<WagmiConfig client={wagmiClient}>
					<AuthProvider>
						<RainbowKitProvider chains={chains} theme={darkMode.value ? lightTheme() : darkTheme()}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</RainbowKitProvider>
					</AuthProvider>
				</WagmiConfig>
			</MantineProvider>
			<Toaster containerClassName="text-sm" />
			<ProgressBar color="#7950f2" />
		</>
	);
}

export default MyApp;
