import AppIntention from "./AppIntention";
import AppPersonalInformation from "./AppPersonalInformation";
import AppTitle from "./AppTitle";
import AppEduExp from "./AppEduExp";
import AppBlock from "./AppBlock";

export default function CVTplApp() {
  return <div className="p-4 container mx-auto">
    <AppTitle />
    <AppIntention />
    <AppPersonalInformation />
    <AppBlock title="学习经历"><AppEduExp /></AppBlock>
    <AppBlock title="工作经历"><AppEduExp /></AppBlock>
    <AppBlock title="个人技能"><AppEduExp /></AppBlock>
    <AppBlock title="项目经历"><AppEduExp /></AppBlock>
  </div>
}