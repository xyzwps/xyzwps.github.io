import React from "react";
import { useRouteData } from "react-static";
import routeToData from "./routes";
import ClassicBlogLayout from "../../components/ClassicBlogLayout";
import TOC from "./toc";


export default function CloudDesignPatternTemplate() {
  const { path } = useRouteData();
  const { Content, meta } = routeToData[path];

  return (
    <ClassicBlogLayout toc={<TOC />}>
      <h1>{meta.title}</h1>
      <small>{path.substr(0, 10)}</small>
      <Content />
    </ClassicBlogLayout>
  );
}
