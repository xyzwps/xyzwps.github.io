import React from "react";
import AnthologyToc from "./AnthologyToc";
import anthologyRoutes from "../anthology/routes";
import "./EpigramLayout.scss";

function EpigramLayout({ anthology, epigram }) {
  const route = `${anthology.path}/${epigram.path}`;
  const { Content, meta } = anthologyRoutes[route];

  return (
    <div className="epigram-layout">
      <div className="toc">
        <AnthologyToc anthology={anthology} />
      </div>
      <div className="content">
        <h1>{meta.title}</h1>
        <Content />
      </div>
    </div>
  );
}

export default EpigramLayout;
