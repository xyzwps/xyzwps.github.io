import _ from 'lodash';
import Asciidoctor from '@asciidoctor/core';
import hljsExt from 'asciidoctor-highlight.js';
import katexExt from 'asciidoctor-katex';
import dayjs from 'dayjs';
import S from 'string';

const asciidoctor = Asciidoctor();
hljsExt.register(asciidoctor.Extensions); // Register the extension into global registry.
katexExt.register(asciidoctor.Extensions, { katexOptions: { macros: { '\\RR': '\\mathbb{R}' } } });

/**
 * @typedef AdocInfo
 * @property {{string}} title
 * @property {{string}} author
 * @property {{string}} version
 * @property {{number}} date
 * @property {{string[]}} tags
 *
 * @param {string} adocText
 * @return {{ content:string, adocInfo:AdocInfo }}
 */
export default function parse(adocText) {
  const doc = asciidoctor.load(adocText, {
    attributes: { icons: 'font', 'source-highlighter': 'highlightjs-ext', stem: 'latexmath' },
  });

  const revisionInfo = doc.getRevisionInfo();
  const adocInfo = {
    title: S(doc.getTitle()).decodeHTMLEntities().s,
    author: doc.getAttribute('author'),
    tags: (() => {
      const tag = doc.getAttribute('tag');
      return _.isEmpty(tag) ? [] : _.split(tag, ',');
    })(),
    version: revisionInfo.getNumber(),
    date: _.isEmpty(revisionInfo.getDate()) ? null : dayjs(revisionInfo.getDate()).valueOf(),
  };
  const content = doc.convert();
  return { adocInfo, content };
}
