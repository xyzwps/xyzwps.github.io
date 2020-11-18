import _ from "lodash"
import fse from "fs-extra"
import adoc, { AdocInfo } from "../lib/adoc"
import { join } from "path"

const POST_DIR = join(process.cwd(), "posts")

const VOLUME = ["java/concurrency"]

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

export async function doGetAllPost(): Promise<{ paths: PathInfo[]; fallback: boolean }> {
  const paths = []
  for (const path of VOLUME) {
    const pageInfoList = await doGetVolume(path)
    paths.push(...pageInfoList)
  }
  return { paths, fallback: true }
}

export interface AdocPostInfo {
  type: "adoc"
  doc: AdocInfo
}

export interface IndexPostInfo {
  type: "index"
  doc: Record<string, unknown>
}

export type PostInfo = AdocPostInfo | IndexPostInfo

export async function doPostByPath(path: string): Promise<PostInfo> {
  const filePath = POST_DIR + "/" + path
  if (_.endsWith(path, ".adoc")) {
    const file = await fse.readFile(filePath)
    const text = file.toString()
    const adocInfo = adoc(text)
    return { type: "adoc", doc: adocInfo }
  } else if (_.endsWith(path, "/index")) {
    const indexFilePath = filePath.substring(0, filePath.length - 5) + "meta.json"
    const file = await fse.readFile(indexFilePath)
    const text = file.toString()
    return { type: "index", doc: JSON.parse(text) }
  }
  throw new Error("暂不支持的类型")
}
