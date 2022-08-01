import React from "react";

export default function Container({ children, maxWidth }) {
  return <div style={{ margin: "1rem auto", padding: 8, maxWidth: maxWidth || 800 }}>{children}</div>;
}
