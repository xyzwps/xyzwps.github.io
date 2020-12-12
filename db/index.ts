import _ from "lodash"
import fse from "fs-extra"
import adoc from "../lib/adoc"
import { readTextFile } from "../lib/fs"
import { PostMeta, Post } from "../types"
import { join } from "path"

const POSTS_DIR = join(process.cwd(), "db", "posts")

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fse.readdir(POSTS_DIR)
  return _.map(files, (fileName) => {
    const [path, ext] = _.split(fileName, ".")
    return { path, ext }
  })
}

export async function getPostByPath(path: string): Promise<Post> {
  const allPosts = await getAllPosts()
  const postMeta = _.find(allPosts, { path })
  const filePath = join(POSTS_DIR, postMeta.path + "." + postMeta.ext)
  const fileText = await readTextFile(filePath)
  const adocInfo = adoc(fileText)
  return { title: adocInfo.title, body: adocInfo.content, type: postMeta.ext }
}
