import path from "path";
import _ from "lodash";

import anthologyGolang from "./src/anthology/golang";
import anthologyRedis from "./src/anthology/redis";

import blogs from "./src/blog";

const blogRoutes = () =>
  blogs.map(({ path }) => {
    return {
      path: `/blogs/${path}`,
      template: "src/blog/template",
      getData: () => ({ path }),
    };
  });

const blogRootRoute = () => ({ path: `/blogs`, template: "src/blog/blogs" });

const getAnthologyRoutes = (anthology) => {
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
    return [
      ...getAnthologyRoutes(anthologyGolang),
      ...getAnthologyRoutes(anthologyRedis),
      ...blogRoutes(),
      blogRootRoute(),
    ];
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
