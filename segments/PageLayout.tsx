import Header from "./Header"

const PageLayout: React.FC<{ children: unknown }> = ({ children }) => {
  return (
    <div style={{ maxWidth: 1366, margin: "0px auto" }}>
      <Header />
      <div>{children}</div>
    </div>
  )
}

export default PageLayout
