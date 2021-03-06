import _ from "lodash"
import fse from "fs-extra"
import adoc from "../lib/adoc"
import { readTextFile } from "../lib/fs"
import { AdocPostInfo, IndexPostInfo, PostInfo, PostToc } from "../types"
import { join } from "path"

const POST_DIR = join(process.cwd(), "posts")

const VOLUME = [
  "lang/java/concurrency",
  "lang/java/basic",
  "lang/go/basic",
  "algorithm/djbp",
  "algorithm/tree",
  "math/sum",
]

export interface PathInfo {
  params: { id: string }
}

async function doGetVolume(path: string): Promise<PathInfo[]> {
  const dir = POST_DIR + "/" + path
  const files = await fse.readdir(dir)
  const result = []
  for (const file of files) {
    if (file === "meta.json") {
      result.push({ path: `${path}/index` })
    } else if (file.endsWith(".adoc")) {
      result.push({ path: `${path}/${file}` })
    }
  }
  return result.map(({ path }) => ({ params: { id: path.split("\\") } }))
}

export async function doGetAllPostPathInfo(): Promise<PathInfo[]> {
  const paths: PathInfo[] = []
  for (const path of VOLUME) {
    const pageInfoList = await doGetVolume(path)
    paths.push(...pageInfoList)
  }
  return paths
}

async function readTocOf(filePath: string): Promise<PostToc> {
  const indexFilePath = filePath.substring(0, filePath.lastIndexOf("/")) + "/meta.json"
  const fileText = await readTextFile(indexFilePath)
  return JSON.parse(fileText)
}

async function doGetAdocPostInfo(filePath: string): Promise<AdocPostInfo> {
  const fileText = await readTextFile(filePath)
  const adocInfo = adoc(fileText)
  const toc = await readTocOf(filePath)
  return { type: "adoc", doc: adocInfo, toc }
}

async function doGetIndexPostInfo(filePath: string): Promise<IndexPostInfo> {
  const toc = await readTocOf(filePath)
  return { type: "index", doc: toc, toc }
}

export async function doPostByPath(path: string): Promise<PostInfo> {
  const filePath = POST_DIR + "/" + path
  if (_.endsWith(path, ".adoc")) {
    return doGetAdocPostInfo(filePath)
  } else if (_.endsWith(path, "/index")) {
    return doGetIndexPostInfo(filePath)
  }
  throw new Error("?????????????????????")
}
