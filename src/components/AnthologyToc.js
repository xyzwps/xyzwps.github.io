import React from "react";
import { Link } from "components/Router";
import './AnthologyToc.scss'

function TocSection({ section, parentPath }) {
  return (
    <div className="anthology-toc-section">
      <div>{section.section}</div>
      <ul className="anthology-toc-section-epigram">
        {section.children.map((epigram) => (
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
    <div className="anthology-toc">
      <h2>
        <Link to={anthologyPath}>{anthology.title}</Link>
      </h2>
      {toc.map((section) => (
        <TocSection section={section} parentPath={anthologyPath} key={section.section} />
      ))}
    </div>
  );
}

export default AnthologyToc;
