import { Redirect } from '@docusaurus/router';
import React from 'react';

function RedirectPage(): JSX.Element {
  return <Redirect to="/docs/examples/boilerplate" />;
}

export default RedirectPage;