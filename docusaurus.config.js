// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'openapi-stack',
  tagline: 'Full stack typesafe API-first development with OpenAPI.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://openapistack.co',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'anttiviljami', // Usually your GitHub org/user name.
  projectName: 'openapi-stack', // Usually your repo name.
  deploymentBranch: 'gh-pages', // The branch that GitHub pages deploys from.
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/epilot-dev/docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/openapi-stack-social-card.jpg',
      navbar: {
        title: 'openapi-stack',
        logo: {
          alt: 'openapi-stack Logo',
          src: 'img/openapi-stack-logo.png',
        },
        items: [
          {
            to: '/docs/intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/openapi-backend/intro',
            label: 'Backend',
            position: 'left',
          },
          {
            to: '/docs/openapi-client-axios/intro',
            label: 'Client',
            position: 'left',
          },
          {
            to: '/docs/openapicmd/intro',
            label: 'CLI',
            position: 'left',
          },
          {
            href: 'https://github.com/anttiviljami/openapi-stack',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Why API First?',
                to: '/docs/api-first',
              },
              {
                label: 'Backend',
                href: '/docs/openapi-backend/intro',
              },
              {
                label: 'Client',
                href: '/docs/openapi-client-axios/intro',
              },
              {
                label: 'CLI',
                href: '/docs/openapicmd/intro',
              },
            ],
          },
          {
            title: 'Libraries',
            items: [
              {
                label: 'openapi-backend',
                href: 'https://www.npmjs.com/package/openapi-backend',
              },
              {
                label: 'openapi-client-axios',
                href: 'https://www.npmjs.com/package/openapi-client-axios',
              },
              {
                label: 'openapicmd',
                href: 'https://www.npmjs.com/package/openapicmd',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'OpenAPI Initiative',
                href: 'https://www.openapis.org/',
              },
              {
                label: 'GitHub Sponsors',
                href: 'https://github.com/sponsors/anttiviljami',
              },
              {
                label: 'Open Collective',
                href: 'https://opencollective.com/openapi-backend',
              },
              {
                label: 'Buy me a coffee',
                href: 'https://www.buymeacoffee.com/anttiviljami',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

    plugins: [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      async function tailwind(context, options) {
        return {
          name: "docusaurus-tailwindcss",
          configurePostCss(postcssOptions) {
            // Appends TailwindCSS and AutoPrefixer.
            postcssOptions.plugins.push(require("tailwindcss"));
            postcssOptions.plugins.push(require("autoprefixer"));
            return postcssOptions;
          },
        };
      },
    ],
};

module.exports = config;
