import { PostInfo } from "../types"

const Toc: React.FC<{ doc: PostInfo }> = ({ doc }) => {
  return (
    <>
      <pre>{JSON.stringify(doc, null, "    ")}</pre>
    </>
  )
}

export default Toc
