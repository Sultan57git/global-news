/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minifier for faster builds
  swcMinify: true,
  
  // Optimize images automatically
  images: {
    domains: [
      'cdn.cnn.com',
      'ichef.bbci.co.uk',
      'static.reuters.com',
      'english.aljazeera.net',
      'media.dw.com',
      'static.dw.com',
      'images.dawn.com',
      'timesofindia.indiatimes.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Internationalization for Bangla and other languages
  i18n: {
    locales: ['bn', 'en', 'hi', 'ur', 'ar'],
    defaultLocale: 'bn',
    localeDetection: false
  },
  
  // Custom headers for better SEO and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      }
    ]
  },
  
  // Generate sitemap and robots.txt automatically
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
      {
        source: '/robots.txt',
        destination: '/api/robots'
      }
    ]
  },
  
  // Optimize for production
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable compression
  compress: true,
  
  // PoweredBy header removal for security
  poweredByHeader: false,
  
  // Custom webpack config for RSS parsing
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add support for RSS parsing
    config.module.rules.push({
      test: /\.rss$/,
      use: 'raw-loader',
    });
    
    return config;
  },
  
  // Environment variables for API keys (will be set later)
  env: {
    SITE_NAME: 'বিশ্ব বাংলা নিউজ',
    SITE_DESCRIPTION: '১০০+ দেশের সংবাদ বাংলায় - প্রবাসী বাংলাদেশীদের জন্য আন্তর্জাতিক সংবাদ',
    SITE_URL: 'https://bishwa-bangla-news.vercel.app'
  }
}

module.exports = nextConfig
