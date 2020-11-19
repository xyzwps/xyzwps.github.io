import Link from "next/link"

const HeaderItem: React.FC<{ children: unknown; href: string }> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a style={{ margin: "0rem 0.5rem" }}>{children}</a>
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
