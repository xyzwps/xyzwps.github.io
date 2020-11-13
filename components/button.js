/**
 * @typedef ButtonProps
 * @property {any[]} children
 * @property {any} onClick
 *
 * @param {ButtonProps} props
 */
function Button(props = {}) {
  const { children, onClick } = props;
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };
  return <button onClick={handleClick}>{children}</button>;
}

export default Button;
