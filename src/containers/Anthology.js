import React from "react";
import { useRouteData } from "react-static";
import { Link } from "components/Router";
import anthologyRoutes from "../anthology/routes";
import _ from "lodash";
import AnthologyToc from "../components/AnthologyToc";

export default function Anthology() {
  const { epigram, anthology } = useRouteData();
  const route = `${anthology.path}/${epigram.path}`;
  const { Content, meta } = anthologyRoutes[route];

  return (
    <div>
      <Link to={`/a/${anthology.path}`}>{"<"} Back</Link>
      <AnthologyToc anthology={anthology} />
      <br />
      <pre>{JSON.stringify(epigram, null, "  ")}</pre>
      <pre>{JSON.stringify(meta, null, "  ")}</pre>
      <Content />
    </div>
  );
}
