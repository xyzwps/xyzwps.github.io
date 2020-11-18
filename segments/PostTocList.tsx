import { PostToc } from "../types"

const PostTocList: React.FC<{ postToc: PostToc }> = ({ postToc }) => {
  const { toc, title } = postToc
  return (
    <div>
      TOC:
      {JSON.stringify(toc)}
      <div>
        <a href="./index">{title}</a>
      </div>
      <ul>
        {toc.map((it) => (
          <li key={it.path}>
            <a href={`./${it.path}`}>{it.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostTocList
