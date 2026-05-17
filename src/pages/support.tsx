import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const SUPPORT_EMAIL = 'support@openapistack.co';

export default function SupportPage(): JSX.Element {
  return (
    <Layout
      title="Commercial support"
      description="Commercial support for openapi-stack is provided by MRR Copilot Oy."
    >
      <main className="py-20 md:py-28 bg-white dark:bg-zinc-950">
        <div className="container max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
            Commercial support
          </h1>
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            Commercial support is provided by{' '}
            <Link to="/imprint">MRR Copilot Oy</Link> (VAT-ID: FI35240143),
            the Finnish company behind the openapi-stack project, founded and
            run by <Link to="https://viljami.io">Viljami Kuosmanen</Link>.
          </p>
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            For commercial enquiries, email{' '}
            <Link to={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
