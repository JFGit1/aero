/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

//module.exports = nextConfig;
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'rickandmortyapi.com',
				port: '',
				pathname: '/api/character/avatar/**',
			},
			{
				protocol: 'https',
				hostname: 'forell-lab.amzb.securityserve.com',
				port: '',
				pathname: '/wp-content/uploads/**',
			},
		],
	},
};
