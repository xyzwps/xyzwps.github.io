import { GetStaticProps, GetStaticPaths } from "next"
import Link from "next/link"
import PageLayout from "../segments/PageLayout"

import { doGetAllPost, PathInfo } from "../posts"

const PostListPage: React.FC<{ paths: PathInfo[] }> = ({ paths }) => {
  return (
    <PageLayout>
      <pre>{JSON.stringify(paths, null, "   ")}</pre>
      <ul>
        {paths.map((it) => (
          <li key={it.params.id[0]}>
            <Link href={"/post/" + it.params.id[0]}>
              <a>{it.params.id[0]}</a>
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
