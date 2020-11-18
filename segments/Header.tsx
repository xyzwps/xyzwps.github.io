import Link from "next/link"

const Header: React.FC<Record<string, unknown>> = () => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <br />
      <br />
      <Link href="/tool/datetime">
        <a>Datetime</a>
      </Link>
      <br />
      <br />
      <Link href="/post-list">
        <a>Post list</a>
      </Link>
    </div>
  )
}

export default Header
