// Users of openapi-stack. Edit this file to add your company.
//
// Drop a PR to add yours — public or private usage is welcome.
// Order is editorial: roughly by relevance + brand recognition,
// epilot pinned first.
//
// Logos: prefer a simple-icons brand slug (`iconSlug`) — these are
// monochrome SVGs served from a reliable CDN. If your brand isn't in
// simple-icons, set `logo` to a direct URL pointing at your logo file
// (PNG or SVG, transparent background preferred).

export type OpenapistackPackage =
  | 'openapi-backend'
  | 'openapi-client-axios'
  | 'openapicmd'
  | 'dereference-json-schema'
  | 'mock-json-schema';

export type UserTier = 'featured' | 'team' | 'community';

export type User = {
  id: string;
  name: string;
  website: string;
  // Primary website domain (used as a fallback identifier).
  domain: string;
  // simple-icons brand slug — see https://simpleicons.org for the list.
  // Resolved to https://cdn.simpleicons.org/{slug}.
  iconSlug?: string;
  // Direct logo URL — used if iconSlug is not set.
  logo?: string;
  description: string;
  packages: OpenapistackPackage[];
  // Optional public link (often a GitHub repo or package.json). Leave
  // undefined if usage is private — that's fine, we're not gatekeeping.
  githubLink?: string;
  // What they're using openapi-stack for, one line.
  useCase: string;
  tier: UserTier;
};

export const logoUrl = (user: User): string => {
  if (user.iconSlug) return `https://cdn.simpleicons.org/${user.iconSlug}`;
  if (user.logo) return user.logo;
  // Fall back to a 1x1 transparent gif if neither is set.
  return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
};

export const USERS: User[] = [
  // The first entry is shown first on the landing page strip.
  {
    id: 'epilot',
    name: 'epilot',
    website: 'https://epilot.cloud',
    domain: 'epilot.cloud',
    logo: 'https://docs.epilot.io/img/logo.png',
    description:
      'B2B SaaS platform for energy and utility companies. epilot\'s core APIs are built on openapi-stack — every backend service and SDK in the platform.',
    packages: ['openapi-client-axios', 'openapi-backend', 'openapicmd'],
    githubLink: 'https://docs.epilot.io/docs/architecture/overview#tech-stack',
    useCase: 'Powers 40+ microservices and their typed JS/TS SDKs end-to-end.',
    tier: 'featured',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    website: 'https://github.com/OfficeDev/microsoft-365-agents-toolkit',
    domain: 'microsoft.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    description:
      'The official Microsoft 365 Agents Toolkit (formerly Teams Toolkit) for building Copilot agents on Teams.',
    packages: ['openapi-client-axios'],
    githubLink:
      'https://github.com/OfficeDev/microsoft-365-agents-toolkit/blob/33aa02a8f6a1ce0e772bbf40e42e386ee420cdb5/templates/js/custom-copilot-rag-custom-api/package.json.tpl#L34',
    useCase:
      'Ships in the Custom Copilot RAG template scaffold so every Teams agent project gets openapi-client-axios out of the box.',
    tier: 'featured',
  },
  {
    id: 'ibm',
    name: 'IBM',
    website: 'https://github.com/nodeshift/nodejs-reference-architecture',
    domain: 'ibm.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    description:
      'IBM and Red Hat\'s joint Node.js reference architecture (maintained by the nodeshift team) recommends openapi-backend for OpenAPI-driven mocking and request handling.',
    packages: ['openapi-backend'],
    githubLink: 'https://github.com/nodeshift/nodejs-reference-architecture/blob/37ed5147abc16cd7ddcda1a321fc348d1f51c619/docs/functional-components/rest-api-development.md#L73',
    useCase: 'Recommended for OpenAPI mocking in IBM/Red Hat\'s Node.js reference architecture.',
    tier: 'featured',
  },
  {
    id: 'sap',
    name: 'SAP',
    website: 'https://sap.github.io/cloud-sdk',
    domain: 'sap.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/1280px-SAP_2011_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
    description:
      'The SAP Cloud SDK — type-safe JavaScript/TypeScript libraries for SAP S/4HANA and SuccessFactors APIs.',
    packages: ['openapi-backend'],
    githubLink: 'https://github.com/SAP/cloud-sdk-js/blob/fb8486aa8826edf9a2ebf55fc678952918e9844a/test-packages/e2e-tests/openapi.js#L2',
    useCase: 'Powers the mock backend the Cloud SDK uses for its end-to-end test suite.',
    tier: 'featured',
  },
  {
    id: 'visma',
    name: 'Visma',
    website: 'https://www.visma.com',
    domain: 'visma.com',
    logo: 'https://upload.wikimedia.org/wikipedia/fi/thumb/2/2b/Visma_logo.svg/1280px-Visma_logo.svg.png',
    description:
      'Nordic ERP, payroll and HR giant operating across Europe with 2+ million customers in 33 countries.',
    packages: ['openapi-backend'],
    githubLink: 'https://github.com/Visma-AS/visma/blob/b9c6b2a8e7c5f5f766a5c8e6e032e966a0e483f2/packages/msw-openapi-backend-integration/package.json#L23',
    useCase: 'Publishes @visma/msw-openapi-backend-integration, a public package wiring openapi-backend into Mock Service Worker.',
    tier: 'featured',
  },
  {
    id: 'github',
    name: 'GitHub',
    website: 'https://docs.github.com',
    domain: 'github.com',
    iconSlug: 'github',
    description:
      'GitHub\'s official documentation site, the source of truth for the GitHub developer platform.',
    packages: ['dereference-json-schema'],
    githubLink: 'https://github.com/github/docs/blob/ecb3e3d95e3ff4effab5bf3d9687dab656f9c4ea/package.json#L205',
    useCase: 'Dereferences the GitHub REST API OpenAPI spec for the docs build pipeline.',
    tier: 'featured',
  },
  {
    id: 'redhat',
    name: 'Red Hat',
    website: 'https://developers.redhat.com/rhdh/overview',
    domain: 'redhat.com',
    iconSlug: 'redhat',
    description:
      'Red Hat Developer Hub — the enterprise Backstage distribution from Red Hat. Co-maintains the IBM/Red Hat Node.js reference architecture that recommends openapi-backend.',
    packages: [
      'openapi-backend',
      'openapi-client-axios',
      'openapicmd',
      'dereference-json-schema',
      'mock-json-schema',
    ],
    githubLink: 'https://github.com/redhat-developer/rhdh-plugins/blob/f13f2c57a5cbc94745a4b7981b94651f8aaf782f/workspaces/bulk-import/packages/backend/package.json#L78',
    useCase: 'Builds and tests OpenAPI-backed plugins across the RHDH ecosystem.',
    tier: 'featured',
  },
  {
    id: 'notion',
    name: 'Notion',
    website: 'https://www.notion.so',
    domain: 'notion.so',
    iconSlug: 'notion',
    description: 'The all-in-one workspace, used by millions to write, plan, and collaborate.',
    packages: ['openapi-client-axios'],
    githubLink: 'https://github.com/makenotion/notion-mcp-server/blob/3bef7addac59b237da3bb41f36a520babc47fa3c/package.json#L29',
    useCase: 'Powers the official Notion MCP server, exposing the Notion API to AI agents.',
    tier: 'featured',
  },
  {
    id: 'prisma',
    name: 'Prisma',
    website: 'https://www.prisma.io',
    domain: 'prisma.io',
    iconSlug: 'prisma',
    description: 'Next-generation Node.js and TypeScript ORM, used by millions of developers.',
    packages: ['dereference-json-schema'],
    githubLink: 'https://github.com/prisma/web/blob/32e7910dc962afc333455e173028fd288bc35ac8/pnpm-lock.yaml#L4530',
    useCase: 'Ships in prisma.io/docs via the fumadocs-openapi pipeline.',
    tier: 'featured',
  },
  {
    id: 'intel-geti',
    name: 'Intel Geti',
    website: 'https://geti.intel.com',
    domain: 'intel.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Intel_logo_2023.svg/960px-Intel_logo_2023.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20230330174340',
    description: 'Intel\'s open computer-vision model-building platform.',
    packages: ['openapi-backend', 'dereference-json-schema', 'mock-json-schema'],
    githubLink: 'https://github.com/open-edge-platform/geti/blob/91220009496caee299a55e0be886c70d02b50f2a/web_ui/package.json#L155',
    useCase: 'Validates API requests and mocks responses across the Geti platform services.',
    tier: 'featured',
  },
  {
    id: 'fastly',
    name: 'Fastly',
    website: 'https://www.fastly.com',
    domain: 'fastly.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Fastly_logo.svg',
    description: 'Edge cloud platform that powers some of the largest sites on the internet.',
    packages: ['openapi-backend'],
    githubLink:
      'https://github.com/fastly/compute-starter-kit-javascript-openapi-validation/blob/3efc8e3527b709ad6c6d2a2e9e09459d2a209e1d/package.json#L13',
    useCase: 'The official OpenAPI Validation Starter Kit for Fastly Compute.',
    tier: 'featured',
  },
  {
    id: 'conductor',
    name: 'Conductor',
    website: 'https://conductor-oss.org',
    domain: 'conductor-oss.org',
    logo: 'https://avatars.githubusercontent.com/u/153258413?s=200&v=4',
    description:
      'Event-driven agentic workflow engine, originally from Netflix, now stewarded by Orkes.',
    packages: ['mock-json-schema'],
    githubLink: 'https://github.com/conductor-oss/conductor/blob/2533d445031b2c066b087fa0a113d4529cbb347e/ui-next/src/pages/definition/EditorPanel/TaskFormTab/helpers.ts#L17',
    useCase: 'Mocks task input forms in the Conductor UI from each task\'s JSON Schema definition.',
    tier: 'featured',
  },
  {
    id: 'zitadel',
    name: 'Zitadel',
    website: 'https://zitadel.com',
    domain: 'zitadel.com',
    logo: 'https://ayedo.de/apps/zitadel-logo.png',
    description: 'Open-source identity and access management. Cloud-native auth for modern apps.',
    packages: ['dereference-json-schema'],
    githubLink: 'https://github.com/zitadel/zitadel',
    useCase: 'Used in the Zitadel docs and SDK generation pipeline.',
    tier: 'featured',
  },
  {
    id: 'qdrant',
    name: 'Qdrant',
    website: 'https://qdrant.tech',
    domain: 'qdrant.tech',
    iconSlug: 'qdrant',
    description: 'High-performance vector database for next-generation AI applications.',
    packages: ['openapi-client-axios', 'dereference-json-schema'],
    githubLink: 'https://github.com/qdrant/qdrant-web-ui',
    useCase: 'Powers the self-hosted Qdrant web UI\'s API client layer.',
    tier: 'featured',
  },
  {
    id: 'stackblitz',
    name: 'StackBlitz',
    website: 'https://stackblitz.com',
    domain: 'stackblitz.com',
    iconSlug: 'stackblitz',
    description: 'In-browser developer environments, makers of WebContainers and the Bolt agent.',
    packages: ['openapi-backend', 'dereference-json-schema', 'mock-json-schema'],
    githubLink: 'https://github.com/stackblitz-labs/pkg.pr.new',
    useCase: 'Powers the API layer of pkg.pr.new, the per-PR npm preview infrastructure.',
    tier: 'featured',
  },
  {
    id: 'drupal',
    name: 'Drupal',
    website: 'https://www.drupal.org',
    domain: 'drupal.org',
    iconSlug: 'drupal',
    description: 'The open-source CMS powering a significant share of the web.',
    packages: ['openapi-client-axios'],
    githubLink: 'https://github.com/drupal/cms-launcher',
    useCase: 'Used in the Drupal CMS Launcher application.',
    tier: 'featured',
  },
  {
    id: 'etherpad',
    name: 'Etherpad',
    website: 'https://etherpad.org',
    domain: 'etherpad.org',
    logo: 'https://etherpad.org/_next/static/media/brand.9923586b.svg',
    description:
      'The original real-time collaborative document editor, used by Wikimedia, Mozilla and many governments.',
    packages: ['openapi-backend', 'dereference-json-schema', 'mock-json-schema'],
    githubLink: 'https://github.com/ether/etherpad-lite',
    useCase: 'Backs the Etherpad HTTP API surface and request validation.',
    tier: 'featured',
  },
  {
    id: 'mojaloop',
    name: 'Mojaloop',
    website: 'https://mojaloop.io',
    domain: 'mojaloop.io',
    // TODO: replace with an official Mojaloop brand-mark URL.
    logo: 'https://avatars.githubusercontent.com/u/24216624?s=400&v=4',
    description:
      'Open-source software for financial inclusion, a Linux Foundation Mojaloop Foundation project backed by the Gates Foundation.',
    packages: ['openapi-backend', 'dereference-json-schema', 'mock-json-schema'],
    githubLink: 'https://github.com/mojaloop/central-ledger',
    useCase:
      'Validates and routes API requests across the central-ledger, ml-api-adapter and SDK scheme adapter components.',
    tier: 'featured',
  },
  {
    id: 'wso2',
    name: 'WSO2',
    website: 'https://wso2.com',
    domain: 'wso2.com',
    logo: 'https://wso2.cachefly.net/wso2/sites/all/image_resources/logos/WSO2-Logo-Black.webp',
    description: 'Enterprise API Management, Integration, and Identity Server, used by Fortune 500s.',
    packages: ['openapi-backend', 'dereference-json-schema', 'mock-json-schema'],
    githubLink: 'https://github.com/wso2/apim-apps',
    useCase: 'Used in the WSO2 API Manager web applications.',
    tier: 'featured',
  },
  {
    id: 'mender',
    name: 'Mender',
    website: 'https://mender.io',
    domain: 'mender.io',
    logo: 'https://avatars.githubusercontent.com/u/15040539?s=200&v=4',
    description:
      'Open-source over-the-air software update manager for IoT devices, by Northern.tech.',
    packages: ['openapi-backend', 'dereference-json-schema', 'mock-json-schema'],
    githubLink: 'https://github.com/mendersoftware/mender-server',
    useCase: 'Validates and mocks OpenAPI specifications across the Mender server services.',
    tier: 'featured',
  },
  {
    id: 'holochain',
    name: 'Holochain',
    website: 'https://www.holochain.org',
    domain: 'holochain.org',
    // TODO: replace with an official Holochain brand-mark URL.
    logo: 'https://avatars.githubusercontent.com/u/15425521?s=400&v=4',
    description: 'A peer-to-peer framework for building agent-centric distributed applications.',
    packages: ['openapi-client-axios'],
    githubLink: 'https://github.com/holochain/launcher',
    useCase: 'Used in the Holochain desktop launcher (Electron) for managing local Holochain apps.',
    tier: 'featured',
  },
  {
    id: 'klavis-ai',
    name: 'Klavis AI',
    website: 'https://klavis.ai',
    domain: 'klavis.ai',
    // TODO: replace with an official Klavis brand-mark URL.
    logo: 'https://avatars.githubusercontent.com/u/205720652?s=400&v=4',
    description: 'MCP integration platform letting AI agents use tools reliably at any scale.',
    packages: ['openapi-client-axios', 'dereference-json-schema'],
    githubLink: 'https://github.com/Klavis-AI/klavis',
    useCase: 'Generates typed MCP server bindings from OpenAPI specs across hundreds of SaaS APIs.',
    tier: 'featured',
  },
  {
    id: 'anytype',
    name: 'Anytype',
    website: 'https://anytype.io',
    domain: 'anytype.io',
    iconSlug: 'anytype',
    description: 'Local-first, encrypted, P2P workspace and knowledge graph.',
    packages: ['openapi-client-axios', 'dereference-json-schema'],
    githubLink: 'https://github.com/anyproto/anytype-mcp',
    useCase: 'Powers the Anytype MCP server.',
    tier: 'featured',
  },
  {
    id: 'agnesoft',
    name: 'Agnesoft',
    website: 'https://agnesoft.com',
    domain: 'agnesoft.com',
    logo: 'https://avatars.githubusercontent.com/u/62834902?v=4',
    description:
      'Maker of agdb, an in-process graph database for embedded and cloud workloads.',
    packages: ['openapi-client-axios', 'openapicmd'],
    githubLink: 'https://github.com/agnesoft/agdb/blob/d64abdf061c1340fa94089cea760e19a21a95727/agdb_api/typescript/package.json#L40',
    useCase: 'Powers @agnesoft/agdb_api, the official TypeScript/JavaScript client for the agdb graph database.',
    tier: 'featured',
  },
  {
    id: 'exxeta',
    name: 'EXXETA',
    website: 'https://www.exxeta.com',
    domain: 'exxeta.com',
    // TODO: replace with an official EXXETA brand-mark URL.
    logo: 'https://avatars.githubusercontent.com/u/9388032?s=400&v=4',
    description: 'European tech consulting firm specialising in software, automotive and energy.',
    packages: ['openapi-backend', 'mock-json-schema'],
    githubLink: 'https://github.com/EXXETA/openapi-cop',
    useCase: 'Ships openapi-cop, a contract-testing proxy built on top of openapi-backend.',
    tier: 'featured',
  },
  {
    id: 'digital-asset',
    name: 'Digital Asset',
    website: 'https://www.digitalasset.com',
    domain: 'digitalasset.com',
    // TODO: replace with an official Digital Asset brand-mark URL.
    logo: 'https://avatars.githubusercontent.com/u/9197588?s=400&v=4',
    description: 'Canton Network — privacy-preserving smart contracts for institutional finance.',
    packages: ['openapi-client-axios', 'openapicmd', 'dereference-json-schema'],
    githubLink: 'https://github.com/digital-asset/cn-quickstart',
    useCase: 'Powers the Canton Network quickstart developer experience.',
    tier: 'featured',
  },
  {
    id: 'polis',
    name: 'Polis',
    website: 'https://pol.is',
    domain: 'pol.is',
    // TODO: replace with an official Polis brand-mark URL.
    logo: 'https://avatars.githubusercontent.com/u/45055853?s=400&v=4',
    description:
      'AI-powered survey for finding consensus across large groups. Famously used in Taiwan\'s vTaiwan democratic process.',
    packages: ['openapi-backend', 'dereference-json-schema', 'mock-json-schema'],
    githubLink: 'https://github.com/compdemocracy/polis',
    useCase: 'Backs the Polis HTTP API.',
    tier: 'featured',
  },
];

// The relative path of this file from the repo root, used by the
// "Add your company" call-to-action to deep-link into GitHub's editor.
export const USERS_SOURCE_PATH = 'src/data/users.ts';
export const REPO_EDIT_URL = `https://github.com/openapistack/docs/edit/main/${USERS_SOURCE_PATH}`;
