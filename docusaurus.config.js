// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'openapi-stack',
  tagline: 'Full stack typesafe API-first development with REST.',
  favicon: 'img/favicon.ico',

  url: 'https://openapistack.co',
  baseUrl: '/',

  organizationName: 'anttiviljami',
  projectName: 'openapi-stack',
  deploymentBranch: 'gh-pages',
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          editUrl: 'https://github.com/anttiviljami/openapi-stack/edit/main/',
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
      image: 'img/openapistack-social.jpg?version=2',
      navbar: {
        title: 'openapi-stack',
        logo: {
          alt: 'openapi-stack Logo',
          src: 'img/openapi-stack-logo.png',
        },
        items: [
          {
            to: '/docs/examples',
            position: 'left',
            label: 'Examples',
          },
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
                label: 'Examples',
                to: '/docs/examples',
              },
              {
                label: 'Backend Reference',
                href: '/docs/openapi-backend/api'
              }
            ],
          },
          {
            title: 'Libraries',
            items: [
              {
                label: 'openapi-backend',
                href: 'https://github.com/anttiviljami/openapi-backend',
              },
              {
                label: 'openapi-client-axios',
                href: 'https://github.com/anttiviljami/openapi-client-axios',
              },
              {
                label: 'openapicmd',
                href: 'https://github.com/anttiviljami/openapicmd',
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
        copyright: `OpenAPI Stack is Free and Open Source Software (FOSS) licensed under the MIT license.`,
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
            postcssOptions.plugins.push(require("tailwindcss"));
            postcssOptions.plugins.push(require("autoprefixer"));
            return postcssOptions;
          },
        };
      },
    ],
};

module.exports = config;