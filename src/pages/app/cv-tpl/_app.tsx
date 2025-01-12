import AppIntention from "./_AppIntention";
import AppPersonalInformation from "./_AppPersonalInformation";
import AppTitle from "./_AppTitle";
import AppEduExp from "./_AppEduExp";
import AppBlock from "./_AppBlock";
import AppWorkExp from "./_AppWorkExp";

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
