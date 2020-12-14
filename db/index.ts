import _ from "lodash"
import fse from "fs-extra"
import adoc from "../lib/adoc"
import { readTextFile } from "../lib/fs"
import { PostMeta, Post, Book } from "../types"
import { join } from "path"

const POSTS_DIR = join(process.cwd(), "db", "posts")
const BOOKS_DIR = join(process.cwd(), "db", "books")

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
  const adocInfo = adoc(fileText) // TODO: 支持更多文档
  return { title: adocInfo.title, body: adocInfo.content, type: postMeta.ext }
}

export async function getAllBooks(): Promise<Book[]> {
  const files = await fse.readdir(BOOKS_DIR)
  const books: Book[] = []
  for (const fileName of files || []) {
    const fileText = await readTextFile(join(BOOKS_DIR, fileName))
    const book: Book = JSON.parse(fileText)
    book.path = _.split(fileName, ".")[0]
    books.push(book)
  }
  return books
}

export async function getBookByPath(path: string): Promise<Book> {
  const filePath = join(BOOKS_DIR, path + ".json")
  const fileText = await readTextFile(filePath)
  const book: Book = JSON.parse(fileText)
  book.path = path
  return book
}
