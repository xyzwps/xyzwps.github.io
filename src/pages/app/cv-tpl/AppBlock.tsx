import type React from "react"

type Props = {
  title: string,
  children: React.ReactElement
}

export default function AppBlock({ title, children }: Props) {
  return <div className="mt-8">
    <div className="text-2xl font-bold my-4">{title}：</div>
    {children}
  </div>
}