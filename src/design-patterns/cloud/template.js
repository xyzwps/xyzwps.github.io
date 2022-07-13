import React from "react";
import { useRouteData } from "react-static";
import routeToData from "./routes";
import Container from "../../components/Container";
import TOC from "./toc";

export default function CloudDesignPatternTemplate() {
  const { path } = useRouteData();
  const { Content, meta } = routeToData[path];

  return (
    <Container>
      <h1>{meta.title}</h1>
      <small>{path.substr(0, 10)}</small>
      <TOC />
      <Content />
    </Container>
  );
}
