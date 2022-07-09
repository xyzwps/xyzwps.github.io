const path = require('path');

const MyMdxPlugin = () => ({
  afterGetConfig: ({ config }) => {
    config.extensions = [...config.extensions, '.md', '.mdx'];
  },
  webpack: (webpackConfig, { defaultLoaders }) => {
    const mdxLoaderPath = require.resolve('@mdx-js/loader');

    webpackConfig.module.rules[0].oneOf.unshift({
      test: /.mdx?$/,
      include: [defaultLoaders.jsLoader.include],
      use: [
        defaultLoaders.jsLoader.use[0],
        {
          loader: mdxLoaderPath,
          options: {},
        },
        path.join(__dirname, './fm-loader'),
      ].filter((x) => x), // Remove falsy value when not parsing front matter
    });

    return webpackConfig;
  },
});

export default MyMdxPlugin;
