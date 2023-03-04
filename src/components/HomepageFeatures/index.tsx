import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Backend',
    Svg: require('@site/static/img/undraw_secure_login_pdn4.svg').default,
    description: (
      <>
        Build, Validate, Route, Authenticate, and Mock your backend using the <Link to={'/docs/openapi-backend/intro'}>openapi-backend</Link> library.
      </>
    ),
  },
  {
    title: 'Client',
    Svg: require('@site/static/img/undraw_code_inspection_bdl7.svg').default,
    description: (
      <>
        Easily consume your OpenAPI specification using the typesafe <Link to={'/docs/openapi-client-axios/intro'}>openapi-client-axios</Link> library.
      </>
    ),
  },
  {
    title: 'CLI',
    Svg: require('@site/static/img/undraw_developer_activity_re_39tg.svg').default,
    description: (
      <>
        Design, automate and test your API using the <Link to={'/docs/openapicmd/intro'}>openapicmd</Link> command line tool.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
