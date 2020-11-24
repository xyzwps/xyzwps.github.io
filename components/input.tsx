import { ChangeEvent, CSSProperties } from "react"
import styles from "./input.module.scss"

const Input: React.FC<{
  value: string
  style?: CSSProperties
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}> = ({ value, onChange, style = null }) => {
  return (
    <input
      className={styles.input}
      style={style}
      value={value}
      onChange={(e) => {
        if (onChange) onChange(e)
      }}
    />
  )
}

export default Input
