import React from 'react';
import Link from '@docusaurus/Link';
import { FiHeart, FiGithub } from 'react-icons/fi';
import contribData from '@site/src/data/contributors.json';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  total: number;
  repos: { repo: string; contributions: number }[];
};

export const Contributors = (): JSX.Element => {
  const contributors = contribData.contributors as Contributor[];

  return (
    <section
      id="contributors"
      className="py-20 md:py-28 bg-white dark:bg-zinc-950 border-t border-zinc-200/70 dark:border-zinc-800/70 scroll-mt-24"
    >
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3">
            openapistack &middot; contributors
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 m-0">
            Built by {contributors.length}+ contributors
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            openapi-stack is the work of dozens of engineers across{' '}
            {contribData.repos.length} repositories — backend, client, CLI,
            utilities, and docs. Thank you to everyone who has filed an
            issue, opened a PR, or reviewed code.
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 md:gap-5 mb-12">
          {contributors.map((c) => (
            <Link
              key={c.login}
              to={c.html_url}
              title={c.login}
              className="group flex flex-col items-center text-center hover:no-underline"
            >
              <img
                src={`${c.avatar_url}${c.avatar_url.includes('?') ? '&' : '?'}s=120`}
                alt={`${c.login}'s avatar`}
                width={56}
                height={56}
                loading="lazy"
                className="w-14 h-14 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800 group-hover:ring-zinc-300 dark:group-hover:ring-zinc-700 transition"
              />
              <div className="mt-1.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 truncate w-full">
                {c.login}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 inline-flex items-center justify-center gap-2">
            <FiHeart size={14} className="text-pink-500" />
            Want to be on this list? File an issue, open a PR, or review one.
          </p>
          <div>
            <Link
              to="https://github.com/openapistack"
              className="button button--primary button--lg inline-flex items-center gap-2"
            >
              <FiGithub size={18} />
              openapistack on GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
