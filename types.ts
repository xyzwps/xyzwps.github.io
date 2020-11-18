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
}
export interface IndexPostInfo {
  type: "index"
  doc: Record<string, unknown>
}

export type PostInfo = AdocPostInfo | IndexPostInfo
