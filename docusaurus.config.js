// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const Footer = `
<div class="my-8 text-zinc-200">OpenAPI Stack is Free and Open Source Software (FOSS) licensed under the MIT license.</div>

<div class="mt-8 mb-6 flex items-center flex-col">
  <a
    id="sponsor-button"
    href="https://github.com/sponsors/anttiviljami"
    class="group flex h-12 w-max items-center gap-4 rounded-lg border-2 bg-zinc-200 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-800 hover:dark:border-zinc-700 hover:dark:bg-zinc-900 no-underline hover:no-underline"
  >
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="aspect-square h-6 fill-pink-500 transition-transform duration-200 ease-in group-hover:scale-110"
    >
      <path d="M17.625 1.499c-2.32 0-4.354 1.203-5.625 3.03-1.271-1.827-3.305-3.03-5.625-3.03C3.129 1.499 0 4.253 0 8.249c0 4.275 3.068 7.847 5.828 10.227a33.14 33.14 0 0 0 5.616 3.876l.028.017.008.003-.001.003c.163.085.342.126.521.125.179.001.358-.041.521-.125l-.001-.003.008-.003.028-.017a33.14 33.14 0 0 0 5.616-3.876C20.932 16.096 24 12.524 24 8.249c0-3.996-3.129-6.75-6.375-6.75zm-.919 15.275a30.766 30.766 0 0 1-4.703 3.316l-.004-.002-.004.002a30.955 30.955 0 0 1-4.703-3.316c-2.677-2.307-5.047-5.298-5.047-8.523 0-2.754 2.121-4.5 4.125-4.5 2.06 0 3.914 1.479 4.544 3.684.143.495.596.797 1.086.796.49.001.943-.302 1.085-.796.63-2.205 2.484-3.684 4.544-3.684 2.004 0 4.125 1.746 4.125 4.5 0 3.225-2.37 6.216-5.048 8.523z" />
    </svg>

    <span class="font-semibold text-zinc-900 dark:text-zinc-300">
      Become a Sponsor!
    </span>
  </a>
</div>`

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'openapi-stack',
  tagline: 'Full stack typesafe API-first development with REST.',
  favicon: 'img/favicon.ico',

  url: 'https://openapistack.co',
  baseUrl: '/',

  organizationName: 'openapistack',
  projectName: 'docs',
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
          editUrl: 'https://github.com/openapistack/docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-Y6PMFWM5ZP',
          anonymizeIP: true,
        }
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
            href: 'https://github.com/openapistack',
            label: 'GitHub',
            position: 'right',
          },
          {
            to: '/docs/examples',
            position: 'left',
            label: 'Examples',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Content',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'Examples',
                to: '/docs/examples',
              },
              {
                label: 'Backend Reference',
                href: '/docs/openapi-backend/api'
              },
              {
                label: 'Client Reference',
                href: '/docs/openapi-client-axios/api'
              },
              {
                label: 'Imprint',
                href: '/imprint',
              },
            ],
          },
          {
            title: 'Libraries',
            items: [
              {
                label: 'openapi-backend',
                href: '/docs/openapi-backend/intro',
              },
              {
                label: 'openapi-client-axios',
                href: '/docs/openapi-client-axios/intro',
              },
              {
                label: 'openapicmd',
                href: '/docs/openapicmd/intro',
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
                href: 'https://opencollective.com/openapi-stack',
              },
              {
                label: 'Buy me a coffee',
                href: 'https://www.buymeacoffee.com/anttiviljami',
              },
            ],
          },
        ],
        copyright: Footer,
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