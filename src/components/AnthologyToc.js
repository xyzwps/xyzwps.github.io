import React from "react";
import { Link } from "components/Router";
import _ from "lodash";

function TocSection({ section, parentPath }) {
  return (
    <div>
      <div>{section.section}</div>
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

function AnthologyToc({ anthology }) {
  const anthologyPath = `/a/${anthology.path}`;
  const toc = anthology.toc;
  return (
    <>
      <h2>
        <Link to={anthologyPath}>{anthology.title}</Link>
      </h2>
      {_.map(toc, (section) => (
        <TocSection section={section} parentPath={anthologyPath} key={section.section} />
      ))}
    </>
  );
}

export default AnthologyToc;
