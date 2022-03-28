// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Alephium Documentation",
  tagline:
    "The 1st operational sharded blockchain scaling and improving on PoW & UTXO to deliver a highly performant, secure and energy efficient DeFi & dApps platform.",
  url: "https://wiki.alephium.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
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
          // Please change this to your repo.
          editUrl: "https://github.com/alephium/new-wiki/tree/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Alephium",
        logo: {
          alt: "Alephium logo",
          src: "img/alephium-logo.svg",
        },
        items: [
          {
            href: "https://github.com/alephium",
            label: "GitHub",
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
                href: "https://discord.gg/JErgRBfRSB",
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
                href: "https://github.com/alephium/desktop-wallet/releases/latest",
              },
              {
                label: "Alephium in 5 minutes",
                href: "https://medium.com/@alephium/welcome-to-alephium-alph-48dfb72aa458/",
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
      },
    }),
};

module.exports = config;
