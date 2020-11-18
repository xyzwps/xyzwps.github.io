import { AdocInfo } from "../types"

const Adoc: React.FC<{ adocInfo: AdocInfo }> = ({ adocInfo }) => {
  return (
    <div className="adoc">
      <div dangerouslySetInnerHTML={{ __html: adocInfo.content }} />
    </div>
  )
}

export default Adoc
