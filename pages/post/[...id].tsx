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
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ flexBasis: "15rem", borderRight: "1px solid lightgray" }}>
          <PostTocList postToc={toc} />
        </div>
        <div style={{ flexBasis: 0, flexGrow: 1, padding: "1rem 3rem" }}>
          {(() => {
            switch (type) {
              case "adoc":
                return <Adoc adocInfo={doc as AdocInfo} />
              case "index":
                return <Toc indexPostInfo={postInfo as IndexPostInfo} />
            }
          })()}
        </div>
        <div style={{ flexBasis: "15rem", borderLeft: "1px solid lightgray" }}>
          TODO:
        </div>
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
