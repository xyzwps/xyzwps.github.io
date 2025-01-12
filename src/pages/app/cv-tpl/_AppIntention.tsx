import Input from "../../../react/Input";
import { useCVData } from "./_store";

export default function AppIntention() {
  const { intention, setIntention } = useCVData();
  return (
    <div className="text-2xl font-bold my-2 flex items-center">
      求职意向：
      <Input noborder size="sm" className="flex-1" value={intention} onChange={(e) => setIntention(e.target.value)} />
    </div>
  );
}
