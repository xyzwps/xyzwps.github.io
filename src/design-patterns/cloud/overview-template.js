import React from "react";
import Container from "../../components/Container";
import Overview, { frontMatter } from "./overview.mdx";
import TOC from "./toc";

export default function CloudDesignPatternTemplate() {
  return (
    <Container>
      <h1>{frontMatter.title}</h1>
      <TOC />
      <Overview />
    </Container>
  );
}
