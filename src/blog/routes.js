import Blog001, { frontMatter as meta001 } from "./2022-06-06-go-http-client-use-self-siged-ca.mdx";
import Blog002, { frontMatter as meta002 } from "./2022-06-23-js-return-await.mdx";
import Blog003, { frontMatter as meta003 } from "./2022-06-25-unicode.mdx";
import Blog004, { frontMatter as meta004 } from "./2022-07-27-pagination.mdx";
import Blog005, { frontMatter as meta005 } from "./2022-08-01-data-format.mdx";
import Blog006, { frontMatter as meta006 } from "./2022-08-02-pagination.mdx";

const list = [
  [Blog001, meta001, "2022-06-06-go-http-client-use-self-siged-ca"],
  [Blog002, meta002, "2022-06-23-js-return-await"],
  [Blog003, meta003, "2022-06-25-unicode"],
  [Blog004, meta004, "2022-07-27-pagination"],
  [Blog005, meta005, "2022-08-01-data-format"],
  [Blog006, meta006, "2022-08-02-pagination"],
];

const routeToData = {};

list.forEach(([Content, meta, path]) => {
  routeToData[path] = { Content, meta, path };
});

export default routeToData;
