import PageLayout from "../segments/PageLayout"
import Link from "next/link"
import Head from "next/head"

const HomePage: React.FC<Record<string, unknown>> = () => {
  return (
    <PageLayout>
      <Head>
        <title>主页</title>
      </Head>
      <Link href="/post/lang/java/basic/index">
        <a>Java 基础</a>
      </Link>
      <Link href="/post/lang/java/concurrency/index">
        <a>Java 并发</a>
      </Link>
      <Link href="/post/lang/go/basic/index">
        <a>Go 基础</a>
      </Link>
    </PageLayout>
  )
}

export default HomePage
