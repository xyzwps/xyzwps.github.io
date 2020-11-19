import PageLayout from "../segments/PageLayout"
import Link from "next/link"

const HomePage: React.FC<Record<string, unknown>> = () => {
  return (
    <PageLayout>
      <Link href="/post/java/concurrency/index">
        <a>Java 并发</a>
      </Link>
    </PageLayout>
  )
}

export default HomePage
