import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import PageLayout from "../../segments/PageLayout"

import { Book } from "../../types"
import { getAllBooks } from "../../db"

const BooksPage: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <PageLayout>
      <Head>
        <title>全部书籍列表</title>
      </Head>
      <ul>
        {books.map((book) => (
          <li key={book.path}>
            <Link href={"/b/" + book.path}>
              <a>{book.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}

export default BooksPage

export const getStaticProps: GetStaticProps = async () => {
  const books = await getAllBooks()
  return { props: { books } }
}
