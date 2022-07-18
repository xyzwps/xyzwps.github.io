import C001, { frontMatter as meta001 } from "./ambassador.mdx";
import C002, { frontMatter as meta002 } from "./anti-corruption-layer.mdx";
import C003, { frontMatter as meta003 } from "./async-request-reply.mdx";
import C004, { frontMatter as meta004 } from "./backends-for-frontends.mdx";
import C005, { frontMatter as meta005 } from "./bulkhead.mdx";
import C006, { frontMatter as meta006 } from "./cache-aside.mdx";
import C007, { frontMatter as meta007 } from "./choreography.mdx";
import C008, { frontMatter as meta008 } from "./circuit-breaker.mdx";
import C009, { frontMatter as meta009 } from "./claim-check.mdx";
import C010, { frontMatter as meta010 } from "./compensating-transaction.mdx";
import C011, { frontMatter as meta011 } from "./competing-consumers.mdx";
import C012, { frontMatter as meta012 } from "./compute-resource-consolidation.mdx";

const list = [
  [C001, meta001, "ambassador"],
  [C002, meta002, "anti-corruption-layer"],
  [C003, meta003, "async-request-reply"],
  [C004, meta004, "backends-for-frontends"],
  [C005, meta005, "bulkhead"],
  [C006, meta006, "cache-aside"],
  [C007, meta007, "choreography"],
  [C008, meta008, "circuit-breaker"],
  [C009, meta009, "claim-check"],
  [C010, meta010, "compensating-transaction"],
  [C011, meta011, "competing-consumers"],
  [C012, meta012, "compute-resource-consolidation"],
];

const pathToData = {};

list.forEach(([Content, meta, path]) => {
  pathToData[path] = { Content, meta, path };
});

export default pathToData;
