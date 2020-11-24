import styles from "./button.module.scss"

const Button: React.FC<{
  children: unknown
  onClick: (event: MouseEvent) => void
}> = ({ children, onClick }) => {
  const handleClick = (e) => {
    if (onClick) onClick(e)
  }
  return (
    <button className={styles.button} onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button
