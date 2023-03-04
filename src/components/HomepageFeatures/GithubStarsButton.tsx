import Link from '@docusaurus/Link';
import React, { useEffect, useMemo, useState } from 'react';

type Props = {
  className?: string;
};

export const GithubStarsButton = ({ className }: Props) => {
  const [starsMap, setStarsMap] = useState<{ [key: string]: number }>({});

  const fetchStars = async () => {
    Promise.all([
      'anttiviljami/openapi-stack',
      'anttiviljami/openapi-backend',
      'anttiviljami/openapi-client-axios',
      'anttiviljami/openapicmd',
    ].map(async (repo) => {
      const res = await fetch(['https://api.github.com/repos', repo].join('/'))
      const data = (await res.json()) as { stargazers_count: number };
      if (typeof data?.stargazers_count === 'number') {
        setStarsMap((prev) => ({ ...prev, [repo]: data.stargazers_count }));
      }
    })).catch(console.error);
  };

  useEffect(() => {
    fetchStars().catch(console.error);
  }, []);

  const stars = useMemo(() => {
    return Object.values(starsMap).reduce((acc, curr) => acc + curr, 0);
  }, [starsMap])

  return (
    <Link className="button button--secondary button--lg space-x-1 align-middle"
            to="https://github.com/anttiviljami/openapi-backend">
      <span>☆</span>
      <span>Star</span>
      <span className="text-sm">
        {stars ? `(${stars})` : '...'}
      </span>
    </Link>
  );
};