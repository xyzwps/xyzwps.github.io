import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import { getAllBooks, getBookByPath, getPostByPath } from "../../../db"
import { Post, Book, BookToc } from "../../../types"
import PageLayout from "../../../segments/PageLayout"
import BookTocBlock from "../../../segments/BookTocBlock"

const PostPage: React.FC<{ bookPath: string; postPath: string; post: Post; book: Book }> = ({
  bookPath,
  post,
  book,
}) => {
  const tocBlock = <BookTocBlock book={book} title={book.title} titleUrl={`/b/${bookPath}`} />
  return (
    <PageLayout>
      <div className="post-layout">
        <div className="left">{tocBlock}</div>
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
      <div className="post-mobile-toc">{tocBlock}</div>
    </PageLayout>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const allBooks = await getAllBooks()
  const allPaths = []
  for (const book of allBooks) {
    const postPaths = extractPostPath(book.toc).map((path) => ({
      params: { bookPath: book.path, postPath: path },
    }))
    allPaths.push(...postPaths)
  }
  return { paths: allPaths, fallback: false }

  function extractPostPath(toc: BookToc): string[] {
    const paths = []
    for (const item of toc) {
      if (item.type === "sub") {
        paths.push(...extractPostPath(item.sub))
      } else {
        paths.push(item.path)
      }
    }
    return paths
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      bookPath: params.bookPath,
      postPath: params.postPath,
      post: await getPostByPath(params.postPath as string),
      book: await getBookByPath(params.bookPath as string),
    },
  }
}
