import React from "react";
import './WebSiteList.scss'

function Item({ title, href, desc }) {
  return (
    <>
      <dt>
        <a href={href}>{title}</a>
      </dt>
      {desc && <dd>{desc}</dd>}
    </>
  );
}

function WebSiteList({ title, list }) {
  return (
    <div className="web-site-list">
      <h1>{title}</h1>
      {list.map(({ section, items }) => (
        <div key={section}>
          <h2>{section}</h2>
          <dl>
            {items.map(({ title, href, desc }, index) => (
              <Item key={index} title={title} href={href} desc={desc} />
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export default WebSiteList;
