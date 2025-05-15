/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*' // API 서버로 프록시
      }
    ];
  }
};

export default nextConfig; 