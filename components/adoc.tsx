import { AdocInfo } from "../types"

const Adoc: React.FC<{ adocInfo: AdocInfo }> = ({ adocInfo }) => {
  return (
    <div className="adoc">
      <pre>{JSON.stringify(adocInfo, null, "  ")}</pre>
      <div dangerouslySetInnerHTML={{ __html: adocInfo.content }} />
    </div>
  )
}

export default Adoc
