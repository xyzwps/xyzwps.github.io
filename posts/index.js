import fse from 'fs-extra';
import { join } from 'path';

const POST_DIR = join(process.cwd(), 'posts');

const VOLUME = ['java/concurrency'];

/**
 * @param {string} path volume path
 * @returns {Promise<{ id: string }[]>}
 */
async function doGetVolume(path) {
  const dir = POST_DIR + '/' + path;
  const files = await fse.readdir(dir);
  const result = [];
  for (const file of files) {
    if (file === 'meta.json') {
      result.push({ path: `${path}/index` });
    } else if (file.endsWith('.adoc')) {
      result.push({ path: `${path}/${file}` });
    }
  }
  console.log('all post path' + JSON.stringify(result, null, '    '));
  return result.map(({ path }) => ({ params: { id: path.split('\\') } }));
}

export async function doGetAllPost() {
  console.log(POST_DIR);
  const paths = [];
  for (const path of VOLUME) {
    const pageInfoList = await doGetVolume(path);
    paths.push(...pageInfoList);
  }

  return { paths, fallback: true };
}
