import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { FiArrowRight } from 'react-icons/fi';

import styles from './index.module.css';
import { GithubStarsButton } from '../components/HomepageFeatures/GithubStarsButton';
import { Sandbox } from '../components/Sandbox/Sandbox';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container flex justify-center">
        <div className="max-w-3xl">
          <h1 className="text-7xl">
            Full stack typesafe API-first development for REST.
          </h1>

          <p className="hero__subtitle">
            OpenAPI Stack is a collection of open source libraries and tools for full stack Typescript development inspired by modern alternatives like GraphQL and tRPC.
            {' '}
            <Link to="/docs/intro/" className="text-white hover:text-gray-300 underline">Compare<FiArrowRight className="arrow relative top-[3px] ml-[.1rem]" size={20} strokeWidth={2} /></Link>
          </p>

          <div className="space-x-2">
            <GithubStarsButton />

            <Link
              className="button button--secondary button--lg mb-2"
              to="/docs/examples"
            >
              Examples
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sponsors() {
  return (
    <div className="container mt-12 mb-6 pb-6 border-b border-gray-400 grid grid-flow-row items-center justify-center justify-items-center gap-4">
      <h2 className="text-lg font-extrabold uppercase tracking-wider opacity-50">
        Supported by
      </h2>

      <div className="flex">
        <a href="https://buildwithfern.com?ref=openapistack.co" className="text-slate-800 hover:text-slate-800 group">
          <div className="flex flex-row items-center w-32">
            <img src="/img/sponsors/fern.svg" alt="Fern" className="h-16 p-2 group-hover:scale-110 transition-all" />

            <div className="text-xl font-bold">Fern</div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <HomepageHeader />

      <Sponsors />

      <main>
        <HomepageFeatures />

        <Sandbox />
      </main>
    </Layout>
  );
}

