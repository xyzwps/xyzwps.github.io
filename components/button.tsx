const Button: React.FC<{
  children: unknown
  onClick: (event: MouseEvent) => void
}> = ({ children, onClick }) => {
  const handleClick = (e) => {
    if (onClick) onClick(e)
  }
  return <button onClick={handleClick}>{children}</button>
}

export default Button
