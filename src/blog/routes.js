import Blog001, { frontMatter as meta001 } from "./2022-06-06-go-http-client-use-self-siged-ca.mdx";
import Blog002, { frontMatter as meta002 } from "./2022-06-23-js-return-await.mdx";
import Blog003, { frontMatter as meta003 } from "./2022-06-25-unicode.mdx";
import Blog004, { frontMatter as meta004 } from "./2022-07-27-pagination.mdx";
import Blog005, { frontMatter as meta005 } from "./2022-08-01-data-format.mdx";
import Blog006, { frontMatter as meta006 } from "./2022-08-02-pagination.mdx";
import Blog00S, { frontMatter as meta00S } from "./2022-08-18-id.mdx";
import Blog007, { frontMatter as meta007 } from "./2022-08-22-authn.mdx";
import Blog008, { frontMatter as meta008 } from "./2022-08-25-fp.mdx";
import Blog009, { frontMatter as meta009 } from "./2022-09-19-graphql-gossip.mdx";
import Blog010, { frontMatter as meta010 } from "./2022-10-17-password-strength.mdx";
import Blog011, { frontMatter as meta011 } from "./2022-12-06-soft-link.mdx";
import Blog012, { frontMatter as meta012 } from "./2023-04-17-mirrors.mdx";

const list = [
  [Blog001, meta001, "2022-06-06-go-http-client-use-self-siged-ca"],
  [Blog002, meta002, "2022-06-23-js-return-await"],
  [Blog003, meta003, "2022-06-25-unicode"],
  [Blog004, meta004, "2022-07-27-pagination"],
  [Blog005, meta005, "2022-08-01-data-format"],
  [Blog006, meta006, "2022-08-02-pagination"],
  [Blog00S, meta00S, "2022-08-18-id"],
  [Blog007, meta007, "2022-08-22-authn"],
  [Blog008, meta008, "2022-08-25-fp"],
  [Blog009, meta009, "2022-09-19-graphql-gossip"],
  [Blog010, meta010, "2022-10-17-password-strength"],
  [Blog011, meta011, "2022-12-06-soft-link"],
  [Blog012, meta012, "2023-04-17-mirrors"]
];

const routeToData = {};

list.forEach(([Content, meta, path]) => {
  routeToData[path] = { Content, meta, path };
});

export default routeToData;
