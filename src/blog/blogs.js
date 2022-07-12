import React from "react";
import { Link } from "../components/Router";
import list from "./index";
import Container from "../components/Container";

export default function Blogs() {
  return (
    <Container>
      文章列表
      <ul>
        {list.map((it) => (
          <li key={it.path}>
            <Link to={`/blogs/${it.path}`}>{it.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
