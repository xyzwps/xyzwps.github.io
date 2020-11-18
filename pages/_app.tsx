import "../styles/app.scss"
import "../styles/fonts/font-awesome/scss/font-awesome.scss"
import "../node_modules/katex/dist/katex.min.css"
import "../node_modules/highlight.js/scss/default.scss"
import type { AppProps /*, AppContext */ } from "next/app"

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
