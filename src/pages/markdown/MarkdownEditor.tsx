import { useEffect, useState } from "react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

async function renderMarkdown(text: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        "*": ["style"],
      },
    })
    .use(rehypeStringify)
    .process(text);

  return String(file);
}

// TODO: localstorge

const DEFAULT_MD = `# Markdown Editor

<div><span style="color: indigo; font-weight: bold;">耽误太多时间</span>，事情可就做不完了。</div>

1. 璃月
   - 刻晴
   - 凝光
2. 蒙德
   - 芭芭拉
   - 优菈
3. 稻妻
   - 宵宫
   - 珊瑚宫心海

| 地区 | 人物 |
|-----|------|
| 璃月 | 刻晴、凝光 |
| 蒙德 | 芭芭拉、优菈 |
| 稻妻 | 宵宫、珊瑚宫心海 |
`;

export default function MarkdownEditor() {
  const [text, setText] = useState(DEFAULT_MD);
  const [html, setHtml] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    renderMarkdown(text).then(setHtml);
  }, []);

  
  
  return (
    <div className="w-full grid grid-cols-2 gap-4 h-screen font-mono text-sm">
      <textarea
        className="h-full p-4"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          renderMarkdown(e.target.value).then(setHtml);
        }}
      />
      <div
        className="prose prose-slate mt-4"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
