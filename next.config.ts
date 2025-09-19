/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "m.media-amazon.com",
			},
		],
	},

	// @ts-ignore
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			"@movies": require("path").resolve(__dirname, "src/movies"),
			"@services": require("path").resolve(__dirname, "src/services"),
			"@components": require("path").resolve(__dirname, "src/components"),
			"@constants": require("path").resolve(__dirname, "src/constants"),
			"@types": require("path").resolve(__dirname, "src/types")
		};
		return config;
	}
};

module.exports = nextConfig;
