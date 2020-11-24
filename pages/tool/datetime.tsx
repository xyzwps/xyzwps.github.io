import dayjs from "dayjs"
import { useState } from "react"
import Head from "next/head"
import Button from "../../components/button"
import Input from "../../components/input"
import PageLayout from "../../segments/PageLayout"

const pattern = "YYYY-MM-DD HH:mm:ss.SSS"

const Row: React.FC<{ children: unknown[] }> = ({ children }) => (
  <p>
    <div style={{ width: 80, display: "inline-block" }}>{children[0]}</div>
    <div style={{ width: 260, display: "inline-block", margin: "0 1rem" }}>{children[1]}</div>
    <div style={{ width: 80, display: "inline-block" }}>{children[2]}</div>
  </p>
)

const DateTimeToolPage: React.FC<Record<string, unknown>> = () => {
  const defaultValue = Date.now()

  const [timestamp, setTimestamp] = useState(defaultValue)
  const [datetimeText, setDatetimeText] = useState(dayjs(defaultValue).format(pattern))

  const refreshWithTimestamp = (timestamp: number) => {
    setTimestamp(timestamp)
    setDatetimeText(dayjs(timestamp).format(pattern))
  }

  return (
    <PageLayout>
      <Head>
        <title>时间戳工具</title>
      </Head>
      <div>
        <Row>
          时间戳：
          <Input
            value={"" + timestamp}
            onChange={(e) => setTimestamp(+e.target.value)}
            style={{ fontFamily: "monospace" }}
          />
          <Button onClick={() => refreshWithTimestamp(timestamp)}>&gt;&gt;</Button>
        </Row>
        <Row>
          日期时间：
          <Input
            value={datetimeText}
            onChange={(e) => setDatetimeText(e.target.value)}
            style={{ fontFamily: "monospace" }}
          />
          <Button onClick={() => refreshWithTimestamp(dayjs(datetimeText, pattern).valueOf())}>
            &gt;&gt;
          </Button>
        </Row>
      </div>
    </PageLayout>
  )
}

export default DateTimeToolPage
