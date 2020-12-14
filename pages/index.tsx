import { GetStaticProps } from "next"
import PageLayout from "../segments/PageLayout"
import TopicEntry from "../segments/TopicEntry"
import Head from "next/head"

import { Book } from "../types"
import { getAllBooks } from "../db"

const HomePage: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <PageLayout>
      <Head>
        <title>主页</title>
      </Head>
      {books.map((book) => (
        <TopicEntry key={book.path} title={book.title} url={"/b/" + book.path} />
      ))}
    </PageLayout>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
  const books = await getAllBooks()
  return { props: { books } }
}
