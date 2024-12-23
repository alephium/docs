// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Alephium Documentation",
  tagline:
    "The 1st operational sharded blockchain scaling and improving on PoW & UTXO to deliver a highly performant, secure and energy efficient DeFi & dApps platform.",
  url: "https://docs.alephium.org",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Alephium", // Usually your GitHub org/user name.
  projectName: "alephium", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ locale, versionDocsDirPath, docPath }) =>
            `https://github.com/alephium/wiki/tree/master${
              locale !== "en" ? `/i18n/${locale}/docusaurus-plugin-content-docs/current` : `/${versionDocsDirPath}`
            }/${docPath}`,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/wiki-metadataimage.jpg",
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "Alephium",
        logo: {
          alt: "Alephium logo",
          src: "img/alephium-logo.svg",
        },
        items: [
          {
            href: "https://github.com/alephium/wiki",
            label: "GitHub",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://alephium.org/discord",
                postion: "left",
              },
              {
                label: "Telegram",
                href: "https://t.me/alephiumgroup",
                postion: "left",
              },
              {
                label: "Reddit",
                href: "https://www.reddit.com/r/alephium",
                postion: "left",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/alephium",
                postion: "left",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Explorer",
                href: "https://explorer.alephium.org",
              },
              {
                label: "Get the wallet",
                href: "https://github.com/alephium/alephium-frontend/releases/latest",
              },
              {
                label: "Tokenomics",
                href: "https://medium.com/@alephium/tokenomics-of-alephium-61d59b51029c",
              },
              {
                label: "White papers",
                href: "https://github.com/alephium/white-paper/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/alephium",
                position: "right",
              },
              {
                label: "Alephium Website",
                href: "https://alephium.org",
                position: "right",
              },
              {
                label: "Blog",
                href: "https://medium.com/@alephium",
                position: "right",
              },
            ],
          },
        ],
        copyright: `Some rights reserved ${new Date().getFullYear()} Alephium. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash", "rust"],
      },
      algolia: {
        appId: "9BBPVRH6NS",
        apiKey: "ac80b7ba74123ae9265eac5e84576e37",
        indexName: "alephium",
      },
      zoom: {
        selector: ".markdown img",
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: "rgb(255, 255, 255)",
            dark: "rgb(50, 50, 50)",
          },
          margin: 60,
        },
      },
    }),
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          { from: "/Introduction.html", to: "/" },
          {
            from: "/Frequently-Asked-Questions.html",
            to: "/frequently-asked-questions",
          },
          {
            from: "/Full-Node-Starter-Guide.html",
            to: "/full-node/getting-started",
          },
          {
            from: "/Full-Node-More.html",
            to: "/full-node/full-node-more",
          },
          {
            from: "/Full-node-on-raspberry-pi.html",
            to: "/full-node/raspberry-pi",
          },
          {
            from: "/Solo-Mining-Guide.html",
            to: "/mining/solo-mining-guide",
          },
          {
            from: "/Pool-Mining-Guide.html",
            to: "/mining/pool-mining-guide",
          },
          {
            from: "/Miner-Troubleshooting.html",
            to: "/mining/miner-troubleshooting",
          },
          {
            from: "/Alephium-Stratum.html",
            to: "/mining/alephium-stratum",
          },
          { from: "/Node-Wallet-Guide.html", to: "/wallet/node-wallet-guide" },
          {
            from: "/Multisig-Guide.html",
            to: "/misc/multisig-guide",
          },
          {
            from: "/Smart-Contract-Guide.html",
            to: "/dapps/tutorials/quick-start",
          },
          {
            from: "/Smart-Contract-More.html",
            to: "/ralph",
          },
          {
            from: "/Explorer-Backend-Starter-Guide.html",
            to: "/infrastructure/explorer-backend",
          },
          {
            from: "/full-node/explorer-backend",
            to: "/infrastructure/explorer-backend",
          },
          { from: "/Roadmap.html", to: "/" },
          {
            from: "/5min-overview",
            to: "/",
          },
          {
            from: "/Internationalization-and-Localization.html",
            to: "/misc/internationalization-and-localization",
          },
          {
            from: "/wallet/desktop-wallet-guide",
            to: "/wallet/desktop-wallet",
          },
          {
            from: "/ralph/asset-permission-system",
            to: "/dapps/concepts/asset-permission-system",
          },
          {
            from: "/The Bridge",
            to: "/infrastructure/the-bridge",
          },
          {
            from: "/tokens/fungible-tokens",
            to: "/dapps/standards/fungible-tokens",
          },
          {
            from: "/tokens/non-fungible-tokens",
            to: "/dapps/standards/non-fungible-tokens",
          },
          {
            from: "/full-node/devnet",
            to: "/full-node/getting-started#devnet",
          }
        ],
      },
    ],
    require.resolve("docusaurus-plugin-image-zoom"),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
};

module.exports = config;
