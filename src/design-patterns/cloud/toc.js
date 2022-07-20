import React from "react";
import { Link } from "@reach/router";
import list from "./index";
import { Toc1 } from "../../components/Toc";

export default function TOC() {
  return (
    <Toc1
      list={list.map((it) => ({ path: `/design-patterns/cloud/${it.path}`, title: it.title }))}
      itemKey={(it) => it.path}
      itemRender={(it) => <Link to={it.path}>{it.title}</Link>}
    />
  );
}
