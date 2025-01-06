import AppInput from "./AppInput"
import { useCVData } from "./store"

export default function AppIntention() {
  const { intention, setIntention } = useCVData()
  return <div className="text-2xl font-bold my-2 flex">
    求职意向：<AppInput className="flex-1" value={intention} onChange={e => setIntention(e.target.value)} />
  </div>
}