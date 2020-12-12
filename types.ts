import { inflate } from "zlib"

export interface AdocInfo {
  title: string
  author: string
  version: string
  date: number
  tags: string[]
  content: string
}
export interface AdocPostInfo {
  type: "adoc"
  doc: AdocInfo
  toc: PostToc
}
export interface IndexPostInfo {
  type: "index"
  doc: PostToc
  toc: PostToc
}

export type PostInfo = AdocPostInfo | IndexPostInfo

export interface PostToc {
  type: "simple"
  title: string
  description: string
  toc: { title: string; path: string }[]
}

export type DocType = "adoc" | "md" | "html"

// TODO: 上面的 Post* 废弃
export interface PostMeta {
  path: string
  ext: DocType
}

export interface Post {
  title: string
  body: string
  type: DocType
}
