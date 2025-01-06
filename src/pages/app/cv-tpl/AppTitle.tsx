import AppInput from "./AppInput"
import { useCVData } from "./store"

export default function AppTitle() {
  const { title, setTitle } = useCVData()
  return <h1 className="text-5xl my-8 font-bold flex">
    <AppInput className="flex-1" value={title} onChange={e => setTitle(e.target.value)} />
  </h1>
}