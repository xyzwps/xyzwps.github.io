import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next"
import Link from "next/link"
import { getAllBooks, getBookByPath } from "../../../db"
import { Book } from "../../../types"
import PageLayout from "../../../segments/PageLayout"

const BookPostPage: React.FC<{ path: string; book: Book }> = ({ path, book }) => {
  return (
    <PageLayout>
      <div className="post-layout">
        <div className="left">{path}</div>
        <div className="post">
          <ol>
            {book.toc.map((it) => (
              <li key={it.path}>
                <Link href={`/b/${path}/${it.path}`}>
                  <a>{it.title}</a>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="right">TODO:</div>
      </div>
      <div className="post-mobile-toc">{path}</div>
    </PageLayout>
  )
}

export default BookPostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const allBooks = await getAllBooks()
  const paths = allBooks.map(({ path }) => ({ params: { bookPath: path } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      path: params.bookPath,
      book: await getBookByPath(params.bookPath as string),
    },
  }
}
