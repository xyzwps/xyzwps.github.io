import { AdocInfo } from "../types"

const Adoc: React.FC<{ adocInfo: AdocInfo }> = ({ adocInfo }) => {
  return (
    <div className="adoc">
      <h1>{adocInfo.title}</h1>
      <small>
        {adocInfo.author} | {adocInfo.version} | {adocInfo.date}
      </small>
      <div dangerouslySetInnerHTML={{ __html: adocInfo.content }} />
    </div>
  )
}

export default Adoc
