export type Action = {
  from?: string | null | undefined;
  to?: string | null | undefined;
  action?: string | null | undefined;
};

export type DayPlan = {
  day?: string | null | undefined;
  actions?: Action[] | null | undefined;
};

export type TravelingPlanProps = {
  days: DayPlan[];
};

const BORDER_COLOR_200 = 'border-indigo-200'
const BORDER_COLOR_100 = 'border-indigo-100'

export default function TravelingPlan({ days }: TravelingPlanProps) {
  return (
    <div className={`border ${BORDER_COLOR_200} rounded-lg px-4 py-8`}>
      <h2 className="mt-1 mb-1 pb-2">旅行计划</h2>
      {days.map((day, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <DayPlanCard {...day} key={index} />
      ))}
    </div>
  );
}

function DayPlanCard({ day, actions }: DayPlan) {
  return (
    <div className={`border-t last:border-b ${BORDER_COLOR_200}`}>
      <div className="bg-indigo-100 px-4 py-1">
        <h2 className="text-xl font-semibold mb-1 mt-1">第{day}天</h2>
      </div>
      <div>
        {actions?.map((action, index) => (
          <div
            className={`border-t ${BORDER_COLOR_100} flex items-center px-4 text-md py-2`}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
          >
            <code>
              {action.from} ~ {action.to}
            </code>
            &emsp;{action.action}
          </div>
        ))}
      </div>
    </div>
  );
}
