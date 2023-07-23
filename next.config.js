/** @type {import('next').NextConfig} */
const nextConfig = {
	loader: "imgix",
	images: {
		domains: ["placehold.co", "upcdn.io"],
	},
};

module.exports = nextConfig;
