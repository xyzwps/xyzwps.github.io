import { AdocInfo } from "../types"
import dayjs from "dayjs"
import Head from "next/head"

const Adoc: React.FC<{ adocInfo: AdocInfo }> = ({ adocInfo }) => {
  return (
    <>
      <Head>
        <title>{adocInfo.title}</title>
      </Head>
      <h1>{adocInfo.title}</h1>
      <small>
        {adocInfo.author} | v{adocInfo.version} | {dayjs(adocInfo.date).format("YYYY年M月D日")}
      </small>
      <div className="adoc" dangerouslySetInnerHTML={{ __html: adocInfo.content }} />
    </>
  )
}

export default Adoc
