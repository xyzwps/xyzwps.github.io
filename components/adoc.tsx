import { AdocInfo } from "../types"
import dayjs from "dayjs"

const Adoc: React.FC<{ adocInfo: AdocInfo }> = ({ adocInfo }) => {
  return (
    <>
      <h1>{adocInfo.title}</h1>
      <small>
        {adocInfo.author} | {adocInfo.version} | {dayjs(adocInfo.date).format("YYYY年M月D日")}
      </small>
      <div className="adoc" dangerouslySetInnerHTML={{ __html: adocInfo.content }} />
    </>
  )
}

export default Adoc
