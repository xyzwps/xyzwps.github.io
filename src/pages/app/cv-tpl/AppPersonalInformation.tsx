import Input from "../../../react/Input";
import { useCVData } from "./store";

export default function AppPersonalInformation() {
  const { birthYear, gender, xueli, email, phone } = useCVData((state) => state.personalInfomation);
  return (
    <table className="mt-8">
      <tbody>
        <tr>
          <td>
            <strong>出生年份：</strong>
            <Input size="sm" noborder className="w-24" value={birthYear} />
            &emsp;<strong>性别：</strong>
            <Input className="w-12" size="sm" noborder value={gender} />
          </td>
          <td>
            <strong>学历：</strong>
            <Input className="w-24" size="sm" noborder value={xueli} />
          </td>
        </tr>
        <tr>
          <td>
            <strong>邮箱：</strong>
            <Input className="w-64" size="sm" noborder value={email} />
          </td>
          <td>
            <strong>电话：</strong>
            <Input className="w-48" size="sm" noborder value={phone} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
