import React from "react";
import { useRouteData } from "react-static";
import { Link } from "components/Router";
import AnthologyToc from "../components/AnthologyToc";

export default function AnthologyPreface() {
  const { anthology } = useRouteData();
  const parentPath = `/a/${anthology.path}`;
  return (
    <div>
      <Link to={parentPath}>{"<"} Back</Link>
      <br />
      <h1>{anthology.title}</h1>
      <AnthologyToc anthology={anthology} />
    </div>
  );
}
