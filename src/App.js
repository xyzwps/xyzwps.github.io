import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
//
import { Link, Router } from "components/Router";
import Dynamic from "containers/Dynamic";

import "./app.css";
import { NavItem, Nav, NavLink } from "./components/Nav";
import MusicLoading from "./components/Loading/MusicLoading";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

const navItems = [
  ["/", "Home"],
  ["/about", "About"],
  ["/dynamic", "Dynamic"],
  ["/jsxgraph", "JSXGraph"],
  ["/mdx", "MDX"],
  ["/collection/frontend", "前端"],
  ["/a/redis", "Redis"],
  ["/a/golang", "Go"],
  ["/blogs", "Blogs"],
  ["/design-patterns", "设计模式"],
  ["/tools/hash", "Hash Tools"],
  ["/a/hash", "Hash"],
  ["/loading", "Loading"],
];

function App() {
  return (
    <Root>
      <Nav>
        {navItems.map((it) => (
          <NavLink key={it[0]} href={it[0]}>
            {it[1]}
          </NavLink>
        ))}
      </Nav>
      <div className="content">
        <React.Suspense
          fallback={
            <div
              style={{
                display: "flex",
                width: "100%",
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MusicLoading />
            </div>
          }
        >
          <Router>
            <Dynamic path="dynamic" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;
