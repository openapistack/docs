import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { LogoStrip } from '@site/src/components/LogoStrip';
import { Contributors } from '@site/src/components/Contributors';
import { FiArrowRight, FiShield } from 'react-icons/fi';

import styles from './index.module.css';
import { GithubStarsButton } from '../components/HomepageFeatures/GithubStarsButton';
import { Sandbox } from '../components/Sandbox/Sandbox';
import { SecureFund, SECURE_FUND_URL } from '@site/src/components/SecureFund';


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

          <div className="mt-4 -mx-12 sm:mx-0">
            <Link
              to={SECURE_FUND_URL}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs sm:text-sm whitespace-nowrap font-medium text-white hover:bg-white/20 hover:text-white hover:no-underline"
            >
              <FiShield className={styles.badgeIcon} size={16} strokeWidth={2} />
              GitHub Secure Open Source Fund alumni
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
        <LogoStrip />

        <HomepageFeatures />

        <SecureFund />

        <Sandbox />

        <Contributors />
      </main>
    </Layout>
  );
}
