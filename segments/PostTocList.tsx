import { PostToc } from "../types"
import styles from "./PostTocList.module.scss"

const PostTocList: React.FC<{ postToc: PostToc }> = ({ postToc }) => {
  const { toc, title } = postToc
  return (
    <div className={styles["post-toc-list"]}>
      <div className="title">
        <a href="./index">{title}</a>
      </div>
      <ol>
        {toc.map((it) => (
          <li key={it.path} className="item">
            <a href={`./${it.path}`}>{it.title}</a>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default PostTocList
