import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import { doGetAllPost, doPostByPath } from "../../posts"
import { AdocInfo, PostInfo } from "../../types"
import Adoc from "../../components/adoc"
import Toc from "../../components/toc"
import PostTocList from "../../segments/PostTocList"

const PostPage: React.FC<{ id; postInfo: PostInfo }> = ({ id, postInfo }) => {
  if (!postInfo) {
    return <div>加载中......</div>
  }

  const { type, doc, toc } = postInfo
  return (
    <div>
      {id}
      <PostTocList postToc={toc} />
      <pre>
        {(() => {
          switch (type) {
            case "adoc":
              return <Adoc adocInfo={doc as AdocInfo} />
            case "index":
              return <Toc doc={postInfo} />
          }
        })()}
      </pre>
    </div>
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
