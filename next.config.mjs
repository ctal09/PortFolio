const nextConfig = {
  reactStrictMode: true,
  // This site has no server-side routes. Exporting it keeps Cloudflare from
  // attempting to run Next's Node server bundle inside a Worker.
  output: 'export',
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
