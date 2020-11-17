/**
 * @typedef ButtonProps
 * @property {object} adocInfo
 * @property {string} content
 *
 * @param {ButtonProps} props
 */
function Toc(props = { doc }) {
  const { doc } = props;

  return (
    <>
      <pre>{JSON.stringify(doc, null, '    ')}</pre>
    </>
  );
}

export default Toc;
