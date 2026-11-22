/**
 * Refresh src/data/contributors.json from the GitHub contributor lists and
 * from published security advisories. Filters bots, dedupes by login, sorts
 * by total credit.
 *
 * A person already in the file stays there. A later refresh must not drop
 * them because GitHub no longer returns the account or the commit.
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
import { readFileSync, writeFileSync } from 'node:fs';
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

type AdvisoryCredit = {
  repo: string;
  ghsa_id: string;
  type: string;
};

type ContributorEntry = {
  login: string;
  avatar_url: string;
  html_url: string;
  total: number;
  repos: { repo: string; contributions: number }[];
  advisories?: AdvisoryCredit[];
};

type GithubUser = {
  login?: string;
  avatar_url?: string;
  html_url?: string;
  type?: string;
};

type AdvisoryListItem = {
  ghsa_id?: string;
  state?: string;
};

type AdvisoryDetail = {
  state?: string;
  credits?: { login?: string; type?: string }[];
};

const ghToken = (): string => {
  try {
    return execSync('gh auth token', { encoding: 'utf8' }).trim();
  } catch {
    throw new Error('Could not read `gh auth token`. Run `gh auth login` first.');
  }
};

const TOKEN = ghToken();

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

const nextUrl = (linkHeader: string | null): string | null => {
  const nextMatch = (linkHeader ?? '').match(/<([^>]+)>;\s*rel="next"/);
  return nextMatch ? nextMatch[1] : null;
};

const fetchJson = async <T>(url: string): Promise<{ body: T; next: string | null; status: number }> => {
  const res = await fetch(url, { headers });
  if (res.status === 404) {
    return { body: [] as T, next: null, status: 404 };
  }
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} on ${url}: ${await res.text()}`);
  }
  return { body: (await res.json()) as T, next: nextUrl(res.headers.get('link')), status: res.status };
};

const fetchAll = async (repo: string): Promise<GithubContributor[]> => {
  const all: GithubContributor[] = [];
  let url: string | null = `https://api.github.com/repos/${repo}/contributors?per_page=100`;
  while (url) {
    const { body, next, status } = await fetchJson<GithubContributor[]>(url);
    if (status === 404) return all;
    all.push(...body);
    url = next;
  }
  return all;
};

const fetchPublishedCredits = async (repo: string): Promise<{ login: string; credit: AdvisoryCredit }[]> => {
  const credits: { login: string; credit: AdvisoryCredit }[] = [];
  let url: string | null = `https://api.github.com/repos/${repo}/security-advisories?per_page=100`;
  while (url) {
    const { body, next, status } = await fetchJson<AdvisoryListItem[]>(url);
    if (status === 404) return credits;
    for (const item of body) {
      if (item.state !== 'published' || !item.ghsa_id) continue;
      const detailUrl = `https://api.github.com/repos/${repo}/security-advisories/${item.ghsa_id}`;
      const detail = await fetchJson<AdvisoryDetail>(detailUrl);
      if (detail.status === 404 || detail.body.state !== 'published') continue;
      for (const credit of detail.body.credits ?? []) {
        if (!credit.login || EXCLUDE_BOTS.has(credit.login)) continue;
        credits.push({
          login: credit.login,
          credit: { repo, ghsa_id: item.ghsa_id, type: credit.type ?? 'reporter' },
        });
      }
    }
    url = next;
  }
  return credits;
};

const fetchUser = async (login: string): Promise<GithubUser | null> => {
  const { body, status } = await fetchJson<GithubUser>(`https://api.github.com/users/${login}`);
  if (status === 404 || body.type === 'Bot' || !body.login) return null;
  return body;
};

const readPrevious = (): ContributorEntry[] => {
  try {
    const parsed = JSON.parse(readFileSync(OUT_PATH, 'utf8')) as { contributors?: ContributorEntry[] };
    return parsed.contributors ?? [];
  } catch {
    return [];
  }
};

const commitTotal = (entry: ContributorEntry): number =>
  entry.repos.reduce((sum, repo) => sum + repo.contributions, 0);

const main = async () => {
  const previous = readPrevious();
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

  for (const repo of REPOS) {
    const credits = await fetchPublishedCredits(repo);
    console.log(`${repo}: ${credits.length} published advisory credits`);
    for (const { login, credit } of credits) {
      let entry = byLogin.get(login);
      if (!entry) {
        const user = await fetchUser(login);
        if (!user) {
          console.log(`skip advisory credit ${login}: GitHub user not found`);
          continue;
        }
        entry = {
          login,
          avatar_url: user.avatar_url ?? '',
          html_url: user.html_url ?? `https://github.com/${login}`,
          total: 0,
          repos: [],
          advisories: [],
        };
        byLogin.set(login, entry);
      }
      entry.advisories ??= [];
      const already = entry.advisories.some((item) => item.repo === credit.repo && item.ghsa_id === credit.ghsa_id);
      if (!already) entry.advisories.push(credit);
    }
  }

  for (const entry of byLogin.values()) {
    entry.total = commitTotal(entry) + (entry.advisories?.length ?? 0);
  }

  for (const prev of previous) {
    if (!prev.login || EXCLUDE_BOTS.has(prev.login) || byLogin.has(prev.login)) continue;
    byLogin.set(prev.login, prev);
    console.log(`kept ${prev.login} (previously credited)`);
  }

  const contributors = [...byLogin.values()].sort((a, b) => b.total - a.total || a.login.localeCompare(b.login));
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
