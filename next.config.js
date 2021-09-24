const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const path = require('path');
/** @type {import('next').NextConfig} */
module.exports = withPlugins(
	[withSvgr],
	{
		reactStrictMode: true,
		sassOptions: {
			includePaths: [path.join(__dirname, 'styles')],
			prependData: `@import "main.scss";`,
		},
		images: {
			domains: ['cdn.sanity.io', 'pbs.twimg.com', "lh3.googleusercontent.com", 'res.cloudinary.com'],
		},
		rewrites: async ()=> {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'http://localhost:5000/api/v1/:path*' // Proxy to Backend
        }
      ]
    }
	}
);



