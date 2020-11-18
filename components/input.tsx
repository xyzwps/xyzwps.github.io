import { ChangeEvent } from "react"

const Input: React.FC<{
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        if (onChange) onChange(e)
      }}
    />
  )
}

export default Input
