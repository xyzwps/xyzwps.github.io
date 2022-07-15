import React from "react";
import { useRouteData } from "react-static";
import routeToData from "./routes";
import Container from "../../components/Container";
import TOC from "./toc";

export default function CloudDesignPatternTemplate() {
  const { path } = useRouteData();
  const { Content, meta } = routeToData[path];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flexBasis: 300, flexShrink: 0 }}>
          <h1>云设计模式</h1>
          <TOC />
        </div>
        <div style={{ flexGrow: 1, maxWidth: 800 }}>
          <h1>{meta.title}</h1>
          <small>{path.substr(0, 10)}</small>
          <Content />
        </div>
      </div>
    </div>
  );
}
