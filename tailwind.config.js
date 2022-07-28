module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				dark: {
					900: '#111',
					800: '#1a1a1a',
					700: '#2b2b2b',
				},
			},
		},
	},
	plugins: [],
};
