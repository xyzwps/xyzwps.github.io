/**
 * @typedef InputProps
 * @property {string} value
 * @property {string} onChange
 *
 * @param {InputProps} props
 */
function Input(props = {}) {
  const { value, onChange } = props;
  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  return <input value={value} onChange={handleChange} />;
}

export default Input;
