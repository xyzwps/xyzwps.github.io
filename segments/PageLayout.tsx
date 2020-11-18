import Header from "./Header"

const PageLayout: React.FC<{ children: unknown }> = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ maxWidth: 1366, margin: "0px auto" }}>{children}</div>
    </>
  )
}

export default PageLayout
