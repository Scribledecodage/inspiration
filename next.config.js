/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /* Permet de lancer un build de vérification sans toucher au dossier .next
     utilisé par le serveur de développement. */
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    unoptimized: true
  },
  webpack(config, { dev }) {
    if (dev && process.platform === 'win32') {
      const ignoredSystemFiles =
        /(?:^|[/\\\\])(?:DumpStack\\.log\\.tmp|hiberfil\\.sys|pagefile\\.sys|swapfile\\.sys)$/i;
      const currentIgnored = config.watchOptions.ignored;

      config.watchOptions.ignored = Array.isArray(currentIgnored)
        ? [...currentIgnored, ignoredSystemFiles]
        : currentIgnored
        ? [currentIgnored, ignoredSystemFiles]
        : [ignoredSystemFiles];
    }

    return config;
  }
};

module.exports = nextConfig;
