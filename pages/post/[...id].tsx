import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import Image from "next/image"
import { doGetAllPostPathInfo, doPostByPath } from "../../posts"
import { AdocInfo, PostInfo, IndexPostInfo } from "../../types"
import Adoc from "../../components/adoc"
import Toc from "../../components/toc"
import PageLayout from "../../segments/PageLayout"
import PostTocList from "../../segments/PostTocList"

const PostPage: React.FC<{ id; postInfo: PostInfo }> = ({ postInfo }) => {
  if (!postInfo) {
    return (
      <div style={{ textAlign: "center", paddingTop: "10rem" }}>
        <Image src="/loading.svg" alt="me" width="120" height="120" />
        <br />
        <span style={{ color: "gray" }}>◎ 电波发射中 ◎</span>
      </div>
    )
  }

  const { type, doc, toc } = postInfo
  return (
    <PageLayout>
      <div className="post-layout">
        <div className="left">
          <PostTocList postToc={toc} />
        </div>
        <div className="post">
          {(() => {
            switch (type) {
              case "adoc":
                return <Adoc adocInfo={doc as AdocInfo} />
              case "index":
                return <Toc indexPostInfo={postInfo as IndexPostInfo} />
            }
          })()}
        </div>
        <div className="right">TODO:</div>
      </div>
    </PageLayout>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const pathInfoList = await doGetAllPostPathInfo()
  return {
    paths: pathInfoList.map((it) => ({ params: { id: it.params.id[0].split("/") } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const postInfo = await doPostByPath((params.id as string[]).join("/"))
  return { props: { id: params.id, postInfo } }
}
