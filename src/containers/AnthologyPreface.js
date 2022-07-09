import React from 'react';
import { useRouteData } from 'react-static';
import { Link } from 'components/Router';
import _ from 'lodash';

function TocSection({ section, parentPath }) {
  return (
    <div>
      <title>{section.section}</title>
      <ul>
        {_.map(section.children, (epigram) => (
          <li key={epigram.path}>
            <Link to={`${parentPath}/${epigram.path}`}>{epigram.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TOC({ parentPath, toc }) {
  return (
    <>
      {_.map(toc, (section) => (
        <TocSection section={section} parentPath={parentPath} key={section.section} />
      ))}
    </>
  );
}

export default function AnthologyPreface() {
  const { anthology } = useRouteData();
  const parentPath = `/a/${anthology.path}`;
  return (
    <div>
      <Link to={parentPath}>{'<'} Back</Link>
      <br />
      <h1>{anthology.title}</h1>
      <TOC parentPath={parentPath} toc={anthology.toc} />
      <pre>{JSON.stringify(anthology, null, '   ')}</pre>
    </div>
  );
}
