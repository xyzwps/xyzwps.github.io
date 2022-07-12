import React from "react";
import { useRouteData } from "react-static";
import routeToData from "./routes";
import Container from "../components/Container";
import list from "./index";
import { Link } from "../components/Router";

export default function BlogTemplate() {
  const { path } = useRouteData();
  const { Content, meta } = routeToData[path];

  const index = list.findIndex((it) => it.path === path);

  return (
    <Container>
      <h1>{meta.title}</h1>
      <small>{path.substr(0, 10)}</small>
      <Content />
      <div>
        {index < list.length - 1 && <Link to={`/blogs/${list[index + 1].path}`}>前一篇</Link>}
        {index > 0 && <Link to={`/blogs/${list[index - 1].path}`}>后一篇</Link>}
      </div>
    </Container>
  );
}
