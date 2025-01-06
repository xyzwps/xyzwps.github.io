import type { ChangeEventHandler } from "react"

type Props = {
    className?: string,
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function AppInput({ className, value, onChange }: Props) {
    return <input className={(className ? className : '') + " outline-none rounded focus:ring-4 focus:ring-violet-400"} value={value} onChange={onChange} />
}