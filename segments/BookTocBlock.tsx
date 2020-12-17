import Link from "next/link"
import { Book, BookToc } from "../types"
import styles from "./BookTocBlock.module.scss"

const TocBlock: React.FC<{ toc: BookToc; book: Book }> = ({ toc, book }) => {
  const list = []
  for (const item of toc) {
    if (item.type === "sub") {
      list.push(
        <li key={item.title}>
          {item.title}
          <TocBlock toc={item.sub} book={book} />
        </li>
      )
    } else {
      list.push(
        <li key={item.title}>
          <Link href={`/b/${book.path}/${item.path}`}>
            <a>{item.title}</a>
          </Link>
        </li>
      )
    }
  }

  return <ol className={styles["book-toc-block"]}>{list}</ol>
}

interface BookTocBlockProps {
  book: Book
  title: string
  titleUrl: string
}

const BookTocBlock: React.FC<BookTocBlockProps> = ({ book, title, titleUrl }) => {
  return (
    <>
      <h2 className={styles["book-toc-title"]}>
        <a href={titleUrl}>{title}</a>
      </h2>
      <TocBlock book={book} toc={book.toc} />
    </>
  )
}

export default BookTocBlock
