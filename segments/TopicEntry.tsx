import Link from "next/link"
import styles from "./TopicEntry.module.scss"

const TopicEntry: React.FC<{ title: string; url: string }> = ({ title, url }) => {
  return (
    <Link href={url}>
      <a className={styles["topic-entry"]}>{title}</a>
    </Link>
  )
}

export default TopicEntry
