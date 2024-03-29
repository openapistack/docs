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

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <HomepageHeader />

      <main>
        <HomepageFeatures />

        <Sandbox />
      </main>
    </Layout>
  );
}

