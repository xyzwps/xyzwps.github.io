import { TbSquarePlus } from "react-icons/tb";
import { useCVData } from "./_store";

export default function AppWorkExp() {
  const { workExp, setEduExp } = useCVData();
  return workExp.length <= 0 ? (
    <div>
      <TbSquarePlus className="cursor-pointer hover:text-xl" />
    </div>
  ) : (
    <div>{JSON.stringify(workExp)}</div>
  );
}
