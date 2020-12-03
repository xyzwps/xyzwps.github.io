import PageLayout from "../segments/PageLayout"
import TopicEntry from "../segments/TopicEntry"
import Head from "next/head"

const HomePage: React.FC<Record<string, unknown>> = () => {
  return (
    <PageLayout>
      <Head>
        <title>主页</title>
      </Head>
      <TopicEntry title="Java 基础" url="/post/lang/java/basic/index" />
      <TopicEntry title="Java 并发" url="/post/lang/java/concurrency/index" />
      <TopicEntry title="Go 基础" url="/post/lang/go/basic/index" />
      <TopicEntry title="DjbP" url="/post/algorithm/djbp/index" />
      <TopicEntry title="数列" url="/post/math/sum/index" />
    </PageLayout>
  )
}

export default HomePage
