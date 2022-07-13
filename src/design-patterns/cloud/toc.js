import React from "react";
import { Link } from "@reach/router";

import list from "./index";

export default function TOC() {
  return (
    <ul>
      {list.map((it) => (
        <li key={it.path}>
          <Link to={`/design-patterns/cloud/${it.path}`}>{it.title}</Link>
        </li>
      ))}
    </ul>
  );
}
