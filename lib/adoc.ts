import _ from "lodash"
import Asciidoctor from "@asciidoctor/core"
import hljsExt from "asciidoctor-highlight.js"
import katexExt from "asciidoctor-katex"
import dayjs from "dayjs"
import S from "string"
import { AdocInfo } from "../types"

const asciidoctor = Asciidoctor()
hljsExt.register(asciidoctor.Extensions) // Register the extension into global registry.
katexExt.register(asciidoctor.Extensions, {
  katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
})

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
    date: _.isEmpty(revisionInfo.getDate()) ? null : dayjs(revisionInfo.getDate()).valueOf(),
    content: doc.convert(),
  }
}
