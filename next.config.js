/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'default',
    domains: ['localhost']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  env:{
    MAILCHIMP_API_KEY: 'ac86d75830f41182dd487b3ce6738ceb-us11',
    MAILCHIMP_API_SERVER: 'us11',
    MAILCHIMP_AUDIENCE_ID: '765eeef81a',
  }

};

module.exports = nextConfig;
