import "../styles/app.scss"
import "../node_modules/katex/dist/katex.min.css"
import type { AppProps /*, AppContext */ } from "next/app"

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
