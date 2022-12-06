import React from "react";

import BlogLayout from "../../components/BlogLayout";
import WebSiteList from "../../components/WebSiteList";

const List = [
  {
    section: "Node.js 版本管理器",
    items: [
      {
        title: "fnm",
        href: "https://github.com/Schniz/fnm",
        desc: "Fast and simple Node.js version manager, built in Rust.",
      },
      {
        title: "nvm",
        href: "https://github.com/nvm-sh/nvm",
        desc: "Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions.",
      },
    ],
  },
  {
    section: "数据校验",
    items: [
      {
        title: "joi",
        href: "https://joi.dev/",
        desc: "The most powerful schema description language and data validator for JavaScript.",
      },
      {
        title: "ow",
        href: "https://www.npmjs.com/package/ow",
        desc: "Function argument validation for humans.",
      },
      {
        title: "zxcvbn",
        herf: "https://www.npmjs.com/package/zxcvbn",
        desc: "A password strength estimator inspired by password crackers.",
      },
    ],
  },
  {
    section: "日志",
    items: [
      {
        title: "tslog",
        href: "https://tslog.js.org/",
        desc: "Expressive TypeScript Logger for Node.js: Pretty errors, stack traces, code frames, and JSON output to attachable transports.",
      },
      {
        title: 'winston',
        href: 'https://www.npmjs.com/package/winston',
        desc: 'A logger for just about everything.'
      },
      {
        title:"pino",
        href: 'https://getpino.io/#/',
        desc: 'super fast, all natural json logger'
      }
    ],
  },
  {
    section: 'Schema',
    items: [
      {
        title:'zod',
        href: 'https://zod.dev/',
        desc: 'TypeScript-first schema declaration and validation library with static type inference',
      },
      {
        title: 'joi',
        href: 'https://joi.dev/',
        desc: 'Object schema validation'
      },
      {
        title: 'yup',
        href: 'https://www.npmjs.com/package/yup',
        desc: 'Dead simple Object schema validation'
      }
    ]
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
        title: "thunky",
        href: "https://www.npmjs.com/package/thunky",
        desc: "Delay the evaluation of a paramless async function and cache the result",
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
