const matter = require('gray-matter');
const stringifyObject = require('stringify-object');

function fmLoader(source) {
  const { content, data } = matter(source);
  const frontMatter = stringifyObject(data);

  const newSource = `export const frontMatter = ${frontMatter};

  ${content}`;

  return newSource;
}

export default fmLoader;
