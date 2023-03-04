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
      <div className="container">
        <img className="max-w-[175px]" src="/img/openapi-stack-logo.png" alt="openapi-stack logo" />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">Full stack typesafe API-first development using OAS.<br />GraphQL-like developer experience with Typescript & OpenAPI.</p>
        <div className="space-x-2 space-y-2">
          <GithubStarsButton />
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
              Documentation
          </Link>
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
