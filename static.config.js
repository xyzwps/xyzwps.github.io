import path from "path";
import _ from "lodash";

import anthologyRedis from "./src/anthology/redis";

const getAnthology = (anthology) => {
  const anthologyPath = "/a/" + anthology.path;
  return [
    {
      path: anthologyPath,
      template: "src/containers/AnthologyPreface",
      getData: () => ({ anthology }),
    },
    ..._(anthology.toc)
      .map("children")
      .flatten()
      .map(({ title, path, meta }) => ({
        path: `${anthologyPath}/${path}`,
        template: "src/containers/Epigram",
        getData: () => ({ epigram: { title, path, meta }, anthology }),
      }))
      .value(),
  ];
};

const config = {
  getRoutes: async () => {
    return [...getAnthology(anthologyRedis)];
  },

  plugins: [
    "react-static-plugin-css-modules",
    "react-static-plugin-sass",
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages"),
      },
    ],
    "my-router",
    require.resolve("react-static-plugin-sitemap"),
    "my-mdx",
  ],
};

export default config;
