import React from 'react';
import Link from '@docusaurus/Link';
import { FiPlus } from 'react-icons/fi';
import { USERS, REPO_EDIT_URL, logoUrl } from '@site/src/data/users';

const FEATURED = USERS.filter((u) => u.tier === 'featured');

export const LogoStrip = (): JSX.Element => {
  return (
    <section className="bg-white dark:bg-zinc-950 border-y border-zinc-200/70 dark:border-zinc-800/70 py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
            openapistack
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 m-0">
            Trusted by teams at
          </h2>
        </div>

        <div
          className="relative overflow-hidden max-h-[328px] md:max-h-[416px]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 68%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 68%, transparent 100%)',
          }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 items-center">
            {FEATURED.map((user) => (
              <Link
                key={user.id}
                to={`/users#${user.id}`}
                className="group flex items-center justify-center h-16 md:h-20 px-2 hover:no-underline"
                title={`${user.name} — ${user.useCase}`}
              >
                <img
                  src={logoUrl(user)}
                  alt={`${user.name} logo`}
                  className="max-h-12 md:max-h-14 max-w-full object-contain opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition duration-200"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <Link
            to="/users"
            className="inline-flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            See all users &rarr;
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <Link
            to={REPO_EDIT_URL}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <FiPlus size={16} strokeWidth={2.5} />
            Add your company
          </Link>
        </div>
      </div>
    </section>
  );
};
