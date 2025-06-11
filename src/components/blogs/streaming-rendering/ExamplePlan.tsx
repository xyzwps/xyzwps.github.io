import type { DayPlan } from "./TravelingPlan";
import TravelingPlan from "./TravelingPlan";

export default function ExamplePlan() {
  const planDays: DayPlan[] = [
    {
      day: "1",
      actions: [
        {
          from: "07:30",
          to: "08:00",
          action: "从德州东站乘坐高铁G106次前往北京南站",
        },
        {
          from: "14:00",
          to: "17:30",
          action: "游览天坛公园（祈年殿、回音壁）",
        },
      ],
    },
    {
      day: "2",
      actions: [
        {
          from: "08:30",
          to: "12:00",
          action: "参观故宫博物院（建议路线：午门→太和殿→珍宝馆）",
        },
      ],
    },
  ];

  return <TravelingPlan days={planDays} />;
}
