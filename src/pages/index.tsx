import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import { GithubStarsButton } from '../components/HomepageFeatures/GithubStarsButton';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container flex justify-center">
        <div className="max-w-2xl">
          <h1 className="hero__title">Full stack typesafe API-first development for REST.</h1>
          <p className="hero__subtitle">OpenAPI Stack is a collection of open source libraries and tools for full stack Typescript development inspired by modern alternatives like GraphQL and tRPC.</p>
          <div className="space-x-2">
            <GithubStarsButton />
            <Link
              className="button button--secondary button--lg mb-2"
              to="/docs/intro">
                Documentation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
