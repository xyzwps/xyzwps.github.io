import Header from "./Header"

const PageLayout: React.FC<{ children: unknown }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default PageLayout
