import React from 'react';
import { useRouteData } from 'react-static';
import { Link } from 'components/Router';
import anthologyRoutes from '../anthology/routes';
import _ from 'lodash';

export default function Anthology() {
  const { epigram, anthology } = useRouteData();

  const route = `${anthology.path}/${epigram.path}`.replace(/\//g, '.').replace(/-/g, '_');

  const Content = _.get(anthologyRoutes, route);

  return (
    <div>
      <Link to={`/a/${anthology.path}`}>{'<'} Back</Link>
      <br />
      <h3>{epigram.title}</h3>
      <p>{epigram.path}</p>
      <Content />
    </div>
  );
}
