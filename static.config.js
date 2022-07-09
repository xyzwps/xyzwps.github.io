import path from 'path';
import _ from 'lodash';

import anthologyRedis from './src/anthology/redis';

const getAnthology = (anthology) => {
  const anthologyPath = '/a/' + anthology.path;
  return [
    {
      path: anthologyPath,
      template: 'src/containers/AnthologyPreface',
      getData: () => ({ anthology }),
    },
    ..._(anthology.toc)
      .map('children')
      .flatten()
      .map(({ title, path }) => ({
        path: `${anthologyPath}/${path}`,
        template: 'src/containers/Anthology',
        getData: () => ({ epigram: { title, path }, anthology }),
      }))
      .value(),
  ];
};

const config = {
  getRoutes: async () => {
    return [...getAnthology(anthologyRedis)];
  },

  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    'my-mdx',
  ],
};

export default config;
