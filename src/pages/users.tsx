import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FiExternalLink, FiGithub, FiPlus } from 'react-icons/fi';
import { USERS, REPO_EDIT_URL, logoUrl, OpenapistackPackage } from '@site/src/data/users';

const PACKAGE_LABEL: Record<OpenapistackPackage, string> = {
  'openapi-backend': 'openapi-backend',
  'openapi-client-axios': 'openapi-client-axios',
  'openapicmd': 'openapicmd',
  'dereference-json-schema': 'dereference-json-schema',
  'mock-json-schema': 'mock-json-schema',
};

const Pkg = ({ name }: { name: OpenapistackPackage }) => (
  <span className="inline-flex items-center text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
    {PACKAGE_LABEL[name]}
  </span>
);

export default function UsersPage(): JSX.Element {
  const featured = USERS.filter((u) => u.tier === 'featured');
  const community = USERS.filter((u) => u.tier !== 'featured');

  return (
    <Layout
      title="Who uses openapi-stack"
      description="Teams and companies building production software with the openapi-stack libraries."
    >
      <main className="py-16 md:py-24 bg-white dark:bg-zinc-950">
        <div className="container max-w-5xl mx-auto px-4">
          <header className="mb-16 text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3">
              openapistack &middot; users
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Who uses openapi-stack
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              A growing list of teams shipping production software with the
              openapi-stack libraries — across open source, internal
              platforms, and commercial products.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <Link
                to={REPO_EDIT_URL}
                className="button button--primary button--lg inline-flex items-center gap-2"
              >
                <FiPlus size={18} strokeWidth={2.5} />
                Add your company
              </Link>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((user) => (
              <article
                key={user.id}
                id={user.id}
                className="group relative flex flex-col p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition scroll-mt-24"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
                    <img
                      src={logoUrl(user)}
                      alt={`${user.name} logo`}
                      className="max-w-10 max-h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold m-0 text-zinc-900 dark:text-zinc-100">
                      {user.name}
                    </h2>
                    <Link
                      to={user.website}
                      className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 inline-flex items-center gap-1"
                    >
                      {user.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      <FiExternalLink size={12} />
                    </Link>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                  {user.description}
                </p>

                <p className="text-sm text-zinc-800 dark:text-zinc-200 mb-4 leading-relaxed">
                  <span className="font-medium">Use case: </span>
                  {user.useCase}
                </p>

                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {user.packages.map((pkg) => (
                      <Pkg key={pkg} name={pkg} />
                    ))}
                  </div>
                  {user.githubLink && (
                    <Link
                      to={user.githubLink}
                      className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 inline-flex items-center gap-1"
                    >
                      <FiGithub size={12} />
                      View usage
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </section>

          {community.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
                Community
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {community.map((user) => (
                  <Link
                    key={user.id}
                    id={user.id}
                    to={user.githubLink ?? user.website}
                    className="flex items-center gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:no-underline scroll-mt-24"
                  >
                    <img
                      src={logoUrl(user)}
                      alt={`${user.name} logo`}
                      className="w-8 h-8 rounded object-contain"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {user.useCase}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className="mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-xl mx-auto">
              Using openapi-stack at your company? Add yourself to the list by
              opening a PR.
            </p>
            <Link
              to={REPO_EDIT_URL}
              className="button button--primary button--lg inline-flex items-center gap-2"
            >
              <FiPlus size={18} strokeWidth={2.5} />
              Add your company
            </Link>
          </footer>
        </div>
      </main>
    </Layout>
  );
}
