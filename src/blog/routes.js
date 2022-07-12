import Blog001, { frontMatter as meta001 } from "./2022-06-06-go-http-client-use-self-siged-ca.mdx";
import Blog002, { frontMatter as meta002 } from "./2022-06-23-js-return-await.mdx";
import Blog003, { frontMatter as meta003 } from "./2022-06-25-unicode.mdx";

const list = [
  [Blog001, meta001, "2022-06-06-go-http-client-use-self-siged-ca"],
  [Blog002, meta002, "2022-06-23-js-return-await"],
  [Blog003, meta003, "2022-06-25-unicode"],
];

const routeToData = {};

list.forEach(([Content, meta, path]) => {
  routeToData[path] = { Content, meta, path };
});

export default routeToData;
