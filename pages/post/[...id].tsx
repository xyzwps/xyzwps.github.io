import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import { doGetAllPost, doPostByPath } from "../../posts"
import { AdocInfo, PostInfo } from "../../types"
import Adoc from "../../components/adoc"
import Toc from "../../components/toc"
import PageLayout from "../../segments/PageLayout"
import PostTocList from "../../segments/PostTocList"

const PostPage: React.FC<{ id; postInfo: PostInfo }> = ({ id, postInfo }) => {
  if (!postInfo) {
    return <div>加载中......</div>
  }

  const { type, doc, toc } = postInfo
  return (
    <PageLayout>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ flexBasis: "15rem", borderRight: "1px solid lightgray" }}>
          <PostTocList postToc={toc} />
        </div>
        <div style={{ flexBasis: 0, flexGrow: 1, padding: "2rem" }}>
          {(() => {
            switch (type) {
              case "adoc":
                return <Adoc adocInfo={doc as AdocInfo} />
              case "index":
                return <Toc doc={postInfo} />
            }
          })()}
        </div>
      </div>
    </PageLayout>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  return await doGetAllPost()
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const postInfo = await doPostByPath((params.id as string[]).join("/"))
  return { props: { id: params.id, postInfo } }
}
