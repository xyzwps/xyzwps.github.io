import AppIntention from "./AppIntention";
import AppPersonalInformation from "./AppPersonalInformation";
import AppTitle from "./AppTitle";
import AppEduExp from "./AppEduExp";
import AppBlock from "./AppBlock";
import AppWorkExp from "./AppWorkExp";

export default function CVTplApp() {
  return (
    <div className="p-4 container mx-auto">
      <AppTitle />
      <AppIntention />
      <AppPersonalInformation />
      <AppBlock title="学习经历">
        <AppEduExp />
      </AppBlock>
      <AppBlock title="工作经历">
        <AppWorkExp />
      </AppBlock>
      <AppBlock title="个人技能">
        <span>ddd</span>
      </AppBlock>
      <AppBlock title="项目经历">
        <span>ddd</span>
      </AppBlock>
    </div>
  );
}
