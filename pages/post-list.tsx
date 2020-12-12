import { GetStaticProps } from "next"
import Link from "next/link"
import Head from "next/head"
import PageLayout from "../segments/PageLayout"

import { doGetAllPostPathInfo, PathInfo } from "../posts"
import { PostMeta } from "../types"
import { getAllPosts } from "../db"

const PostListPage: React.FC<{ paths: PathInfo[]; allPosts: PostMeta[] }> = ({
  paths,
  allPosts,
}) => {
  return (
    <PageLayout>
      <Head>
        <title>全部文章列表</title>
      </Head>
      <ul>
        {allPosts.map(({ path }) => (
          <li key={path}>
            <Link href={"/p/" + path}>
              <a>/p/{path}</a>
            </Link>
          </li>
        ))}
      </ul>
      <hr />
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

export const getStaticProps: GetStaticProps = async () => {
  const paths = await doGetAllPostPathInfo()
  const allPosts = await getAllPosts()
  return { props: { paths, allPosts } }
}
