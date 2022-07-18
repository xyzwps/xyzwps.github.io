import React from "react";
import './ClassicBlogLayout.scss'

export default function ClassicBlogLayout({ toc, children }) {
  return (
    <div className="xn-class-blog-layout">
      <div className="xn-class-blog-layout-toc">{toc}</div>
      <div className="xn-class-blog-layout-content">{children}</div>
    </div>
  );
}
