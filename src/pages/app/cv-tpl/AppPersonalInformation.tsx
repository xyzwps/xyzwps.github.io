import AppInput from "./AppInput"
import { useCVData } from "./store"

export default function AppPersonalInformation() {
  const { birthYear, gender, xueli, email, phone } = useCVData(state => state.personalInfomation)
  return <div className="mt-8">
    <div className="my-2">
      出生年份：<AppInput className="w-24" value={birthYear} />&emsp;性别：<AppInput className="w-12" value={gender} />&emsp;&emsp;学历：<AppInput className="w-12" value={xueli} />
    </div>
    <div className="my-2">
      邮箱：<AppInput className="w-64" value={email} />&emsp;电话：<AppInput className="w-32" value={phone} />
    </div>
  </div>
}