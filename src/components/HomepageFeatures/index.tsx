import React from 'react';
import Link from '@docusaurus/Link';
import { FiArrowRight, FiServer, FiBox, FiTerminal } from 'react-icons/fi';

type FeatureItem = {
  title: string;
  package: string;
  description: JSX.Element;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  to: string;
};

const FEATURES: FeatureItem[] = [
  {
    title: 'Backend',
    package: 'openapi-backend',
    Icon: FiServer,
    to: '/docs/openapi-backend/intro',
    description: (
      <>
        Build, validate, route, authenticate and mock your backend using the{' '}
        <Link to="/docs/openapi-backend/intro">openapi-backend</Link> library.
        Framework-agnostic, runs on Express, Hapi, Koa, AWS Lambda and more.
      </>
    ),
  },
  {
    title: 'Client',
    package: 'openapi-client-axios',
    Icon: FiBox,
    to: '/docs/openapi-client-axios/intro',
    description: (
      <>
        Easily consume your OpenAPI specification using the typesafe{' '}
        <Link to="/docs/openapi-client-axios/intro">openapi-client-axios</Link>{' '}
        library. Full TypeScript IntelliSense, runtime introspection, no codegen
        required.
      </>
    ),
  },
  {
    title: 'CLI',
    package: 'openapicmd',
    Icon: FiTerminal,
    to: '/docs/openapicmd/intro',
    description: (
      <>
        Generate types, design and test your API using the{' '}
        <Link to="/docs/openapicmd/intro">openapicmd</Link> command line tool.
        Bundle, lint, mock and serve OpenAPI specs from one binary.
      </>
    ),
  },
];

const Feature = ({ title, package: pkg, Icon, to, description }: FeatureItem) => (
  <Link
    to={to}
    className="group flex flex-col p-5 md:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 hover:no-underline transition"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <h3 className="m-0 mb-1 text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          {pkg}
        </span>
      </div>
    </div>
    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-normal flex-1 m-0">
      {description}
    </p>
    <div className="mt-4 inline-flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
      Read the docs
      <FiArrowRight
        size={14}
        strokeWidth={2.5}
        className="ml-1 group-hover:translate-x-0.5 transition-transform"
      />
    </div>
  </Link>
);

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3">
            the stack
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 m-0">
            Three libraries. One ecosystem.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
            Free and open-source, MIT-licensed, framework-agnostic. Pick any
            one or use them together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
