import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import { doGetAllPost, doPostByPath, PostInfo } from "../../posts"
import { AdocInfo } from "../../lib/adoc"
import Adoc from "../../components/adoc"
import Toc from "../../components/toc"

const PostPage: React.FC<{ id; postInfo: PostInfo }> = ({ id, postInfo }) => {
  return (
    <div>
      {id}
      <pre>
        {(() => {
          if (postInfo) {
            const { type, doc } = postInfo
            switch (type) {
              case "adoc":
                return <Adoc adocInfo={doc as AdocInfo} />
              case "index":
                return <Toc doc={postInfo} />
            }
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
