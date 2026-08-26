const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/v1/create-qr-code/**",
      },
      {
        protocol: "https",
        hostname: "heartview-images.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.heartviewhealth.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.heartviewhealth.com",
        pathname: "/**",
      },
    ],
  },

  transpilePackages: ["ckeditor5", "ckeditor5-premium-features"],

  compress: true,

  async rewrites() {
    if (isDev) {
      return [
        {
          // Proxy API requests to bypass CORS in local development
          source: "/api-proxy/:path*",
          destination: "http://localhost:3000/api/:path*",
        },
      ];
    }

    return [
      {
        source: "/uploads/:path*",
        destination: "https://api.heartviewhealth.com/uploads/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
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

              script-src
                'self'
                'unsafe-inline'
                ${isDev ? "'unsafe-eval'" : ""}
                https://www.gstatic.com
                https://www.google.com
                https://www.gstatic.cn
                https://www.recaptcha.net
                https://pagead2.googlesyndication.com
                https://www.googletagmanager.com
                https://www.google-analytics.com
                https://*.google-analytics.com
                https://unpkg.com
                https://googleads.g.doubleclick.net;

              worker-src
                'self'
                blob:
                https://unpkg.com;

              frame-src
                'self'
                blob:
                https://heartview-images.s3.ap-south-1.amazonaws.com
                https://www.google.com
                https://recaptcha.google.com
                https://www.recaptcha.net
                https://www.googletagmanager.com
                https://googleads.g.doubleclick.net
                https://*.doubleclick.net;

              connect-src
                'self'
                blob:
                https://api.heartviewhealth.com
                http://localhost:3001
                http://localhost:3000
                https://www.heartviewhealth.com
                https://heartviewhealth.com
                https://*.googleapis.com
                https://securetoken.googleapis.com
                https://identitytoolkit.googleapis.com
                https://www.googleapis.com
                https://firebaseinstallations.googleapis.com
                https://www.google-analytics.com
                https://*.google-analytics.com
                https://*.analytics.google.com
                https://www.googletagmanager.com
                https://*.g.doubleclick.net
                https://pagead2.googlesyndication.com
                https://googleads.g.doubleclick.net
                https://*.adtrafficquality.google;
              img-src
                'self'
                data:
                blob:
                https:
                http://localhost:*;

              style-src
                'self'
                'unsafe-inline';

              font-src
                'self'
                data:
                https://fonts.gstatic.com
                https://fonts.googleapis.com;

              object-src 'none';
            `.replace(/\s+/g, " "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;