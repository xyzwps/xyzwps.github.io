import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import Link from "next/link"
import { getAllBooks, getBookByPath, getPostByPath } from "../../../db"
import { Post, Book } from "../../../types"
import PageLayout from "../../../segments/PageLayout"

const PostPage: React.FC<{ bookPath: string; postPath: string; post: Post; book: Book }> = ({
  bookPath,
  postPath,
  post,
  book,
}) => {
  return (
    <PageLayout>
      <div className="post-layout">
        <div className="left">
          {bookPath} - {postPath}
          <h2>{book.title}</h2>
          <ol>
            {book.toc.map((it) => (
              <li key={it.path}>
                <Link href={`/b/${bookPath}/${it.path}`}>
                  <a>{it.title}</a>
                </Link>
              </li>
            ))}
          </ol>
          <pre>{JSON.stringify(book, null, "   ")}</pre>
        </div>
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
      <div className="post-mobile-toc">{bookPath}</div>
    </PageLayout>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const allBooks = await getAllBooks()
  const paths = []
  for (const book of allBooks) {
    for (const post of book.toc) {
      paths.push({ params: { bookPath: book.path, postPath: post.path } })
    }
  }
  return { paths, fallback: false }
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
