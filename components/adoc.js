/**
 * @typedef ButtonProps
 * @property {object} adocInfo
 * @property {string} content
 *
 * @param {ButtonProps} props
 */
function Adoc(props = {}) {
  const { adocInfo, content } = props;

  return (
    <div className="adoc">
      <pre>{JSON.stringify(adocInfo, null, '    ')}</pre>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Adoc;
