import Link from "next/link"
import styles from "./Header.module.scss"

const HeaderItem: React.FC<{ children: unknown; href: string }> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className={styles["header-item"]}>{children}</a>
    </Link>
  )
}

const Header: React.FC<Record<string, unknown>> = () => {
  return (
    <nav style={{ display: "flex", borderBottom: "1px solid lightgray", padding: "0.5rem 1rem" }}>
      <HeaderItem href="/">Home</HeaderItem>
      <HeaderItem href="/tool/datetime">Datetime</HeaderItem>
      <HeaderItem href="/post-list">Post list</HeaderItem>
    </nav>
  )
}

export default Header
