import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { FiArrowRight } from 'react-icons/fi';

export const SECURE_FUND_URL =
  'https://github.blog/open-source/maintainers/maintainers-dont-need-more-ai-bug-reports-they-need-fixes/';
export const BLOG_POST_URL = 'https://viljami.io/feed/openapi-stack-joins-the-github-secure-open-source-fund/';
const THREAT_MODEL_URL = 'https://github.com/openapistack/openapi-backend/blob/main/docs/threat-model.md';
const CODEQL_URL = 'https://github.com/openapistack/openapi-backend-codeql';

const Logo = ({ className }: { className?: string }): JSX.Element => (
  <img
    src={useBaseUrl('/img/github-secure-open-source-fund.png')}
    alt="GitHub Secure Open Source Fund, powered by GitHub Sponsors"
    width={1052}
    height={238}
    className={className}
    loading="lazy"
  />
);

/** Homepage section */
export const SecureFund = (): JSX.Element => (
  <section className="bg-white dark:bg-zinc-950 py-16">
    <div className="container max-w-5xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
        <Link to={SECURE_FUND_URL} className="shrink-0 hover:no-underline">
          <Logo className="block h-auto w-64 md:w-80" />
        </Link>

        <div className="text-center md:text-left">
          <p className="flex items-center justify-center md:justify-start gap-3 text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
            <span className="rounded-full bg-green-600 px-2.5 py-0.5 font-sans text-[11px] font-semibold tracking-wider text-white">
              New
            </span>
            Security
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mt-0 mb-3">
            GitHub Secure Open Source Fund alumni
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            openapi-stack went through GitHub's security program with GitHub Security Lab. It came out with a{' '}
            <Link to={THREAT_MODEL_URL}>threat model</Link>, <Link to={CODEQL_URL}>CodeQL packs</Link> that scan
            your own code, an SBOM and reproducible builds.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm font-medium">
            <Link
              to={BLOG_POST_URL}
              className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Read the blog post <FiArrowRight size={16} strokeWidth={2} />
            </Link>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">·</span>
            <Link
              to="/docs/openapi-backend/security"
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Security best practices
            </Link>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">·</span>
            <Link
              to={SECURE_FUND_URL}
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              GitHub's announcement
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/** Compact card for docs pages */
export const SecureFundBadge = (): JSX.Element => (
  <div className="my-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-xl border border-solid border-zinc-200 bg-white p-5">
    <Link to={SECURE_FUND_URL} className="shrink-0">
      <Logo className="block h-auto w-52" />
    </Link>
    <p className="m-0 text-sm text-zinc-600 text-center sm:text-left">
      openapi-stack is an alumni of the <Link to={SECURE_FUND_URL}>GitHub Secure Open Source Fund</Link>. The{' '}
      <Link to={THREAT_MODEL_URL}>threat model</Link>, the <Link to={CODEQL_URL}>CodeQL packs</Link> and the
      security guidance in these docs came out of that program. <Link to={BLOG_POST_URL}>Read the blog post</Link>.
    </p>
  </div>
);
