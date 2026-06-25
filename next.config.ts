/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/v1/create-qr-code/**",
      },
    ],
  },

  compress: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: `
    default-src 'self';

    script-src 'self' 'unsafe-inline'
      https://www.googletagmanager.com
      https://www.google-analytics.com;

    style-src 'self' 'unsafe-inline';

    img-src 'self' data: blob:
      https://api.qrserver.com
      https://heartview-images.s3.ap-south-1.amazonaws.com
      https://www.google-analytics.com
      https://www.googletagmanager.com
      https://*.google.com
      https://*.gstatic.com;

    connect-src 'self'
      https://www.google-analytics.com
      https://www.googletagmanager.com;

    font-src 'self' data:;

    frame-src
      https://www.google.com
      https://www.google.com/maps;

    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  `
              .replace(/\n/g, "")
              .replace(/\s{2,}/g, " "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
