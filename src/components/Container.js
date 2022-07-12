import React from "react";

export default function Container({ children }) {
  return <div style={{ margin: "1rem auto", maxWidth: 800 }}>{children}</div>;
}
