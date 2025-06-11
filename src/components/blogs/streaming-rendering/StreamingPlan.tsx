import { useEffect, useRef, useState } from "react";
import parseYaml from "./yaml";
import type { DayPlan } from "./TravelingPlan";
import TravelingPlan from "./TravelingPlan";
import Button from "../../../react/Button";

const PLAN_YAML = `
- day: "1"
  actions:
    - from: "07:30"
      to: "08:00"
      action: "从德州东站乘坐高铁G106次前往北京南站"
    - from: "10:30"
      to: "11:30"
      action: "抵达北京南站，乘坐地铁4号线直达酒店办理入住"
    - from: "12:00"
      to: "13:30"
      action: "午餐：前门大街品尝老北京炸酱面"
    - from: "14:00"
      to: "17:30"
      action: "游览天坛公园（祈年殿、回音壁）"
    - from: "19:00"
      to: "20:30"
      action: "晚餐：大栅栏传统小吃（推荐爆肚、豆汁）"

- day: "2"
  actions:
    - from: "08:30"
      to: "12:00"
      action: "参观故宫博物院（建议路线：午门→太和殿→珍宝馆）"
    - from: "12:30"
      to: "13:30"
      action: "午餐：故宫角楼咖啡简餐"
    - from: "14:00"
      to: "16:00"
      action: "景山公园俯瞰故宫全景"
    - from: "17:00"
      to: "19:00"
      action: "王府井步行街自由活动"
    - from: "19:30"
      to: "21:00"
      action: "晚餐：四季民福烤鸭店"

- day: "3"
  actions:
    - from: "09:00"
      to: "12:30"
      action: "颐和园游览（重点：长廊、佛香阁、石舫）"
    - from: "13:00"
      to: "14:00"
      action: "午餐：颐和园内听鹂馆"
    - from: "14:30"
      to: "17:00"
      action: "圆明园遗址公园（西洋楼遗址区）"
    - from: "18:30"
      to: "20:00"
      action: "晚餐：五道口清华科技园美食区"

- day: "4"
  actions:
    - from: "08:00"
      to: "09:30"
      action: "乘坐旅游巴士前往八达岭长城"
    - from: "10:00"
      to: "14:00"
      action: "登八达岭长城（北线至北八楼）"
    - from: "14:30"
      to: "15:30"
      action: "午餐：长城脚下农家菜"
    - from: "16:00"
      to: "18:00"
      action: "返程参观鸟巢、水立方外景"
    - from: "19:30"
      to: "21:00"
      action: "晚餐：新奥购物中心京菜馆"

- day: "5"
  actions:
    - from: "09:30"
      to: "12:00"
      action: "南锣鼓巷胡同文化体验"
    - from: "12:30"
      to: "13:30"
      action: "午餐：姚记炒肝店"
    - from: "14:00"
      to: "17:00"
      action: "什刹海划船+参观恭王府"
    - from: "17:30"
      to: "19:00"
      action: "烟袋斜街淘宝购物"
    - from: "19:30"
      to: "21:00"
      action: "晚餐：烤肉季老字号"

- day: "6"
  actions:
    - from: "09:00"
      to: "11:30"
      action: "国家博物馆（古代中国陈列馆）"
    - from: "12:00"
      to: "13:00"
      action: "午餐：国博咖啡厅简餐"
    - from: "13:30"
      to: "16:30"
      action: "798艺术区参观画廊展览"
    - from: "17:30"
      to: "19:30"
      action: "三里屯太古里自由活动"
    - from: "20:00"
      to: "21:30"
      action: "晚餐：TRB Hutong法餐厅"

- day: "7"
  actions:
    - from: "09:00"
      to: "11:00"
      action: "雍和宫参观祈福"
    - from: "11:30"
      to: "12:30"
      action: "午餐：孔庙国子监附近京味斋"
    - from: "13:00"
      to: "15:00"
      action: "北海公园游船+白塔参观"
    - from: "15:30"
      to: "16:00"
      action: "酒店取行李"
    - from: "16:30"
      to: "18:00"
      action: "北京南站乘坐G159次高铁返回德州"
`;

function chunkString(str: string, size: number): string[] {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.substring(i, i + size));
  }
  return chunks;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type Stage = "init" | "streaming" | "done";

export default function StreamingPlan() {
  const [yaml, setYaml] = useState("");
  const [plan, setPlan] = useState<DayPlan[]>([]);
  const [stage, setStage] = useState<Stage>("init");

  useEffect(() => {
    try {
      const json = parseYaml(yaml) as DayPlan[];
      const days = json.map((p) => ({
        day: p.day,
        actions: p.actions?.filter((a) => typeof a !== "string"),
      }));
      setPlan(days);
    } catch (e) {
      // ignore
    }
  }, [yaml]);

  const reset = () => {
    setYaml("");
    setPlan([]);
    setStage("init");
  };
  const demo = () => {
    setYaml("");
    setPlan([]);
    setStage("streaming");
    const tokens = chunkString(PLAN_YAML, 4);
    (async () => {
      for (const token of tokens) {
        await sleep(40);
        setYaml((x) => x + token);
      }
      setStage("done");
    })();
  };

  return (
    <div>
      {stage !== "init" && <TravelingPlan days={plan} />}
      {stage === "init" && <Button onClick={demo}>开始演示</Button>}
      {stage === "done" && (
        <div>
          <Button className="mt-2" onClick={demo}>
            重新演示
          </Button>
          &emsp;
          <Button className="mt-2" onClick={reset}>
            重置
          </Button>
        </div>
      )}
    </div>
  );
}
