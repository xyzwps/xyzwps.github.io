import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import { getAllPosts, getPostByPath } from "../../db"
import { Post } from "../../types"
import PageLayout from "../../segments/PageLayout"

const PostPage: React.FC<{ path: string; post: Post }> = ({ path, post }) => {
  return (
    <PageLayout>
      <div className="post-layout">
        <div className="left">{path}</div>
        <div className="post">
          <h1>{post.title}</h1>
          {(() => {
            switch (post.type) {
              case "adoc":
                return <div className="adoc" dangerouslySetInnerHTML={{ __html: post.body }} />
              default:
                return <div>暂不支持的文档类型:{post.type}</div>
            }
          })()}
        </div>
        <div className="right">TODO:</div>
      </div>
      <div className="post-mobile-toc">{path}</div>
    </PageLayout>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts()
  return {
    paths: allPosts.map(({ path }) => ({ params: { path } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      path: params.path,
      post: await getPostByPath(params.path as string),
    },
  }
}
