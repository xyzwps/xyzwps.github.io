import C001, { frontMatter as meta001 } from "./ambassador.mdx";
import C002, { frontMatter as meta002 } from "./anti-corruption-layer.mdx";
import C003, { frontMatter as meta003 } from "./async-request-reply.mdx";
import C004, { frontMatter as meta004 } from "./backends-for-frontends.mdx";
import C005, { frontMatter as meta005 } from "./bulkhead.mdx";

const list = [
  [C001, meta001, "ambassador"],
  [C002, meta002, "anti-corruption-layer"],
  [C003, meta003, "async-request-reply"],
  [C004, meta004, "backends-for-frontends"],
  [C005, meta005, "bulkhead"],
];

const pathToData = {};

list.forEach(([Content, meta, path]) => {
  pathToData[path] = { Content, meta, path };
});

export default pathToData;
