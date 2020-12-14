import Link from "next/link"
import { Book, BookToc } from "../types"

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

  return <ol>{list}</ol>
}

const BookTocBlock: React.FC<{ book: Book }> = ({ book }) => {
  return <TocBlock book={book} toc={book.toc} />
}

export default BookTocBlock
