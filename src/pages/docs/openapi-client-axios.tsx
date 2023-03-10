import { Redirect } from '@docusaurus/router';
import React from 'react';

function RedirectPage(): JSX.Element {
  return <Redirect to="/docs/openapi-client-axios/intro" />;
}

export default RedirectPage;