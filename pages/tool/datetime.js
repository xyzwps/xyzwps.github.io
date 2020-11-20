import dayjs from "dayjs"
import { useState } from "react"
import Button from "../../components/button"
import Input from "../../components/input"
import PageLayout from "../../segments/PageLayout"

function DateTimeToolPage() {
  const [timestamp, setTimestamp] = useState(dayjs().valueOf())
  const [datetimeText, setDatetimeText] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss.SSS"))
  return (
    <PageLayout>
      <div>
        时间戳：
        <Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
        <br />
        日期时间：
        <Input value={datetimeText} onChange={(e) => setDatetimeText(e.target.value)} />
        <br />
        <Button>点点滴滴</Button>
      </div>
    </PageLayout>
  )
}

export default DateTimeToolPage
