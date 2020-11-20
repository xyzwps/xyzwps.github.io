import { IndexPostInfo } from "../types"
import Head from "next/head"

const Toc: React.FC<{ indexPostInfo: IndexPostInfo }> = ({ indexPostInfo }) => {
  const { doc } = indexPostInfo
  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <h1>{doc.title}</h1>
      <p>{doc.description}</p>
    </>
  )
}

export default Toc
