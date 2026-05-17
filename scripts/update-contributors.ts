/**
 * Refresh src/data/contributors.json by fetching the contributor list from
 * every openapi-stack repo via the GitHub API. Filters bots, dedupes by
 * login, sorts by total contribution count.
 *
 * Usage:
 *     npm run update-contributors
 *
 * Requires:
 *     gh CLI authenticated (`gh auth status`). Token is fetched on the fly
 *     via `gh auth token` — no GITHUB_TOKEN env var needed.
 *
 * Run on Node 18+ (uses native fetch). Executed via tsx, no build step.
 */

import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPOS = [
  'openapistack/openapi-backend',
  'openapistack/openapi-client-axios',
  'openapistack/openapicmd',
  'openapistack/docs',
  'anttiviljami/dereference-json-schema',
  'anttiviljami/mock-json-schema',
  'anttiviljami/glob-json-path',
] as const;

const EXCLUDE_BOTS = new Set([
  'dependabot[bot]',
  'renovate[bot]',
  'github-actions[bot]',
  'snyk-bot',
  'allcontributors[bot]',
  'claude',
  'lgtm-migrator',
]);

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(SCRIPT_DIR, '..', 'src', 'data', 'contributors.json');

type GithubContributor = {
  login?: string;
  avatar_url?: string;
  html_url?: string;
  contributions?: number;
  type?: string;
};

type ContributorEntry = {
  login: string;
  avatar_url: string;
  html_url: string;
  total: number;
  repos: { repo: string; contributions: number }[];
};

const ghToken = (): string => {
  try {
    return execSync('gh auth token', { encoding: 'utf8' }).trim();
  } catch {
    throw new Error('Could not read `gh auth token`. Run `gh auth login` first.');
  }
};

const TOKEN = ghToken();

const fetchPage = async (url: string): Promise<{ items: GithubContributor[]; next: string | null }> => {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} on ${url}: ${await res.text()}`);
  }
  const items = (await res.json()) as GithubContributor[];
  // Parse Link header for the next-page URL.
  const linkHeader = res.headers.get('link') ?? '';
  const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
  return { items, next: nextMatch ? nextMatch[1] : null };
};

const fetchAll = async (repo: string): Promise<GithubContributor[]> => {
  const all: GithubContributor[] = [];
  let url: string | null = `https://api.github.com/repos/${repo}/contributors?per_page=100`;
  while (url) {
    const { items, next } = await fetchPage(url);
    all.push(...items);
    url = next;
  }
  return all;
};

const main = async () => {
  const byLogin = new Map<string, ContributorEntry>();

  for (const repo of REPOS) {
    const items = await fetchAll(repo);
    console.log(`${repo}: ${items.length} contributors`);
    for (const c of items) {
      const login = c.login;
      if (!login || EXCLUDE_BOTS.has(login) || c.type === 'Bot') continue;
      const entry = byLogin.get(login) ?? {
        login,
        avatar_url: c.avatar_url ?? '',
        html_url: c.html_url ?? '',
        total: 0,
        repos: [],
      };
      const contribs = c.contributions ?? 0;
      entry.total += contribs;
      entry.repos.push({ repo, contributions: contribs });
      byLogin.set(login, entry);
    }
  }

  const contributors = [...byLogin.values()].sort((a, b) => b.total - a.total);
  const payload = {
    contributors,
    repos: REPOS,
    generated_at: new Date().toISOString().slice(0, 10),
  };
  writeFileSync(OUT_PATH, JSON.stringify(payload, null, 1) + '\n');
  console.log(`\nWrote ${contributors.length} unique contributors to ${OUT_PATH}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
