import _ from "lodash"
import Asciidoctor from "@asciidoctor/core"
import hljsExt from "asciidoctor-highlight.js"
import katexExt from "asciidoctor-katex"
import dayjs from "dayjs"
import S from "string"

const asciidoctor = Asciidoctor()
hljsExt.register(asciidoctor.Extensions) // Register the extension into global registry.
katexExt.register(asciidoctor.Extensions, {
  katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
})

export interface AdocInfo {
  title: string
  author: string
  version: string
  date: number
  tags: string[]
  content: string
}

export default function parse(adocText: string): AdocInfo {
  const doc = asciidoctor.load(adocText, {
    attributes: {
      icons: "font",
      "source-highlighter": "highlightjs-ext",
      stem: "latexmath",
    },
  })

  const revisionInfo = doc.getRevisionInfo()
  return {
    title: S(doc.getTitle()).decodeHTMLEntities().s,
    author: doc.getAttribute("author"),
    tags: (() => {
      const tag = doc.getAttribute("tag")
      return _.isEmpty(tag) ? [] : _.split(tag, ",")
    })(),
    version: revisionInfo.getNumber(),
    date: _.isEmpty(revisionInfo.getDate())
      ? null
      : dayjs(revisionInfo.getDate()).valueOf(),
    content: doc.convert(),
  }
}
