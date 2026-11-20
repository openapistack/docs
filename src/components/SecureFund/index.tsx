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
  <section className="bg-zinc-50 dark:bg-zinc-950 py-8 md:py-10">
    <div className="container max-w-5xl mx-auto px-4">
      <div
        className="flex flex-col md:flex-row items-center gap-6 md:gap-0 rounded-2xl border border-solid border-zinc-200 bg-white p-6 md:p-8 shadow-sm"
        style={{
          backgroundImage:
            'linear-gradient(115deg, rgba(147,213,0,0.10) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 62%, rgba(102,90,231,0.10) 100%)',
        }}
      >
        <Link to={SECURE_FUND_URL} className="shrink-0 hover:no-underline md:pr-8">
          <Logo className="block h-auto w-56 md:w-64" />
        </Link>

        <div className="text-center md:text-left md:border-0 md:border-l md:border-solid md:border-zinc-200 md:pl-8">
          <p className="flex items-center justify-center md:justify-start gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
            <span className="rounded-full bg-green-600 px-2.5 py-0.5 font-sans text-[11px] font-semibold tracking-wider text-white">
              New
            </span>
            Security
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 mt-0 mb-2">
            OpenAPI-Stack joins the GitHub Secure Open Source Fund
          </h2>
          <p className="text-[15px] leading-relaxed text-zinc-600 mb-4">
            openapi-stack went through GitHub's security program with GitHub Security Lab. It came out with a{' '}
            <Link to={THREAT_MODEL_URL}>threat model</Link>, <Link to={CODEQL_URL}>CodeQL packs</Link> that scan
            your own code, an SBOM and reproducible builds.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-3 text-sm font-medium">
            <Link
              to={BLOG_POST_URL}
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 hover:text-white hover:no-underline"
            >
              Read the blog post <FiArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link
              to="/docs/openapi-backend/security"
              className="text-zinc-700 hover:text-zinc-900"
            >
              Security best practices
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
