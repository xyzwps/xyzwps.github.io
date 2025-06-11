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

export default function TravelingPlan({ days }: TravelingPlanProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="border-b m-0 pb-2">旅行计划</h2>
      {days.map((day, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <DayPlanCard {...day} key={index} />
      ))}
    </div>
  );
}

function DayPlanCard({ day, actions }: DayPlan) {
  return (
    <div className="border-b border-gray-200">
      <div className="bg-gray-100 px-4 py-2">
        <h2 className="text-xl font-semibold my-1">第{day}天</h2>
      </div>
      <div className="divide-gray-200">
        {actions?.map((action, index) => (
          <div
            className="border-b flex items-center px-4 text-md py-2"
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
