import React from "react";

import BlogLayout from "../../components/BlogLayout";
import WebSiteList from "../../components/WebSiteList";

const List = [
  {
    section: "数据校验",
    items: [
      {
        title: "joi",
        href: "https://joi.dev/",
        desc: "The most powerful schema description language and data validator for JavaScript.",
      },
      {
        title: 'ow',
        href: 'https://www.npmjs.com/package/ow',
        desc: 'Function argument validation for humans.'
      }
    ],
  },
  {
    section: "惊喜",
    items: [
      {
        title: "table",
        href: "https://www.npmjs.com/package/table",
        desc: "Formats data into a string table.",
      },
      {
        title: "yn",
        href: "https://www.npmjs.com/package/yn",
        desc: "Parse yes/no like values",
      },
    ],
  },
];

function JS() {
  return (
    <BlogLayout>
      <WebSiteList title="常用 JS 库" list={List} />
    </BlogLayout>
  );
}

export default JS;
