import Link from "next/link"
import styles from "./TopicEntry.module.scss"

const TopicEntry: React.FC<{ title: string; url: string }> = ({ title, url }) => {
  return (
    <div className={styles["topic-entry"]}>
      <Link href={url}>
        <a>{title}</a>
      </Link>
    </div>
  )
}

export default TopicEntry
