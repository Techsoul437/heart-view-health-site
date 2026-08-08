/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
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
    script-src 'self' 'unsafe-inline' ${
      isDev ? "'unsafe-eval'" : ""
    } https://www.gstatic.com https://www.google.com https://www.gstatic.cn https://www.recaptcha.net;
    frame-src https://www.google.com https://recaptcha.google.com https://www.recaptcha.net;
    connect-src 'self' https://*.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://www.googleapis.com https://firebaseinstallations.googleapis.com;
    img-src 'self' data: https:;
    style-src 'self' 'unsafe-inline';
  `.replace(/\n/g, " "),
}
        ],
      },
    ];
  },
};

module.exports = nextConfig;
