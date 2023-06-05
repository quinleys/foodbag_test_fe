const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        API_URL: process.env.API_URL,
        API_TOKEN: process.env.API_TOKEN,
    },
    images: {
        domains: [process.env.IMAGE_DOMAIN],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/products',
                permanent: true,
            },
        ];
    },
}

module.exports = nextConfig
