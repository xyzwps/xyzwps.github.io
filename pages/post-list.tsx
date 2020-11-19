import { GetStaticProps, GetStaticPaths } from "next"
import Link from "next/link"
import Head from "next/head"
import PageLayout from "../segments/PageLayout"

import { doGetAllPost, PathInfo } from "../posts"

const PostListPage: React.FC<{ paths: PathInfo[] }> = ({ paths }) => {
  return (
    <PageLayout>
      <Head>
        <title>全部文章列表</title>
      </Head>
      <ul>
        {paths.map((it) => (
          <li key={it.params.id[0]}>
            <Link href={"/post/" + it.params.id[0]}>
              <a>/post/{it.params.id[0]}</a>
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}

export default PostListPage

export const getStaticPaths: GetStaticPaths = async () => {
  return await doGetAllPost()
}

export const getStaticProps: GetStaticProps = async () => {
  const { paths } = await doGetAllPost()
  return { props: { paths } }
}
